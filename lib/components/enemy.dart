import 'dart:async';
import 'dart:math';
import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flame/particles.dart';
import 'package:flame/sprite.dart';
import 'package:flame_audio/flame_audio.dart' as audio;
import 'package:space_shooter/components/bullet.dart';
import 'package:space_shooter/constants.dart';

/// A component representing an enemy ship that moves across the screen and shoots bullets.
class Enemy extends SpriteComponent with HasGameRef, CollisionCallbacks {
  /// The component responsible for spawning enemy bullets.
  late SpawnComponent _bulletSpawner;

  /// The current health of the enemy.
  int _health = enemyHealth;

  /// The sprite sheet used for explosion animations.
  late final SpriteSheet _explosionSpriteSheet;

  /// Creates a new enemy with default size.
  Enemy() : super(size: Vector2.all(enemySize));

  @override
  FutureOr<void> onLoad() async {
    sprite = await Sprite.load('enemySprite.png');

    _bulletSpawner = SpawnComponent(
      factory: (index) {
        return Bullet(
          position: position + Vector2(-10, 0),
          bulletSpeed: enemyBulletSpeed,
        );
      },
      period: enemyShootingSpeed,
      autoStart: true,
      selfPositioning: true,
    );

    gameRef.add(_bulletSpawner);

    // Rotate enemy to face the correct direction
    add(RotateEffect.by(-pi / 2, EffectController(duration: 0)));

    add(RectangleHitbox());

    // Set up explosion sprite sheet for particle effects
    final explosionSprite = await Sprite.load('explosionAtlas.png');
    _explosionSpriteSheet = SpriteSheet(
      image: explosionSprite.image,
      srcSize: Vector2(100, 100),
      margin: 0,
      spacing: 0,
    );
  }

  @override
  void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
    super.onCollision(intersectionPoints, other);

    if (other is Bullet) {
      _health--;
      other.removeFromParent();
      if (_health <= 0) {
        removeFromParent();
        _bulletSpawner.timer.stop();
      }

      // Add explosion particle effect
      add(
        ParticleSystemComponent(
          particle: SpriteAnimationParticle(
            animation: _explosionSpriteSheet.createAnimation(
              row: 0,
              stepTime: 0.1,
            ),
          ),
        ),
      );

      audio.FlameAudio.play('hit.wav', volume: 0.1);
    }
  }

  @override
  void update(double dt) {
    // Move enemy left
    position.x -= enemySpeed * dt;

    // Remove enemy if off screen
    if (position.x < -size.x) {
      removeFromParent();
    }
  }

  /// Stops the enemy from shooting bullets.
  void stopShooting() {
    _bulletSpawner.timer.stop();
  }

  /// Starts the enemy shooting bullets.
  void startShooting() {
    _bulletSpawner.timer.start();
  }
}
