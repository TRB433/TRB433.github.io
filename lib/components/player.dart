import 'dart:async';
import 'dart:math';
import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flame_audio/flame_audio.dart' as audio;
import 'package:space_shooter/constants.dart';
import 'package:space_shooter/game.dart';
import 'bullet.dart';

/// Represents the possible states of the player.
enum PlayerState {
  /// Player is alive and can move/shoot.
  alive,

  /// Player has been destroyed.
  dead,
}

/// A component representing the player's spaceship.
///
/// Handles player movement, shooting, health tracking, and scoring.
class Player extends SpriteAnimationComponent
    with HasGameRef<SpaceShooter>, CollisionCallbacks {
  /// Creates a new player at the starting position.
  Player()
    : super(
        position: Vector2(playerStartX, playerStartY),
        size: Vector2.all(playerSize),
      );

  final Vector2 _velocity = Vector2.zero();
  final double _speed = playerSpeed;
  late final SpawnComponent _bulletSpawner;
  int _health = playerStartHealth;
  double _score = 0;
  PlayerState _playerState = PlayerState.alive;

  @override
  Future<void> onLoad() async {
    await super.onLoad();

    animation = await gameRef.loadSpriteAnimation(
      'playerAtlas.png',
      SpriteAnimationData.sequenced(
        amount: 2,
        stepTime: 0.15,
        textureSize: Vector2(485, 515),
        loop: true,
        amountPerRow: 2,
      ),
    );

    _bulletSpawner = SpawnComponent(
      factory: (index) {
        return Bullet(
          position: position + Vector2(size.x, size.y / 2),
          bulletSpeed: bulletSpeed,
        );
      },
      period: playerShootingSpeed,
      autoStart: false,
      selfPositioning: true,
    );

    gameRef.add(_bulletSpawner);

    add(RotateEffect.by(pi / 2, EffectController(duration: 0)));
    add(RectangleHitbox());
  }

  @override
  void update(double dt) {
    if (_playerState == PlayerState.alive) {
      super.update(dt);
      position += _velocity * dt;

      if (_health <= 0) {
        _playerState = PlayerState.dead;
      }

      _score += scorePerSecond * dt;
    }
  }

  @override
  void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
    super.onCollision(intersectionPoints, other);

    if (other is Bullet) {
      _health--;
      other.removeFromParent();
      audio.FlameAudio.play('hit.wav', volume: 0.1);
    }
  }

  /// Moves the player upward.
  void moveUp() {
    _velocity.y = -_speed;
  }

  /// Moves the player downward.
  void moveDown() {
    _velocity.y = _speed;
  }

  /// Stops the player's movement.
  void stopMoving() {
    _velocity.setZero();
  }

  /// Starts shooting bullets.
  void shootBullet() {
    if (!_bulletSpawner.timer.isRunning()) {
      _bulletSpawner.timer.start();
    }
  }

  /// Stops shooting bullets.
  void stopShooting() {
    _bulletSpawner.timer.stop();
  }

  /// Resets the player to initial state.
  void reset() {
    _health = playerStartHealth;
    position = Vector2(playerStartX, playerStartY);
    _playerState = PlayerState.alive;
    _score = 0;
  }

  /// Gets the current score as a formatted string.
  String getScore() => _score.toStringAsFixed(0);

  /// Gets the current health as a string.
  String getHealth() => _health.toString();

  /// Gets the current player state.
  PlayerState get playerState => _playerState;
}
