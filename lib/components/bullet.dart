import 'dart:async';
import 'package:flame/collisions.dart';
import 'package:flame/components.dart';

/// A component representing a bullet that moves horizontally across the screen.
class Bullet extends SpriteComponent with HasGameRef, CollisionCallbacks {
  /// The horizontal speed at which the bullet moves.
  final double bulletSpeed;

  /// Creates a new bullet with the given position and speed.
  Bullet({super.position, required this.bulletSpeed})
    : super(size: Vector2.all(10), anchor: Anchor.center);

  @override
  FutureOr<void> onLoad() async {
    // Load bullet sprite
    sprite = await Sprite.load('bullet.png');
    add(RectangleHitbox());
  }

  @override
  void update(double dt) {
    super.update(dt);
    position.x += bulletSpeed * dt;

    // Remove bullet when it moves off screen
    if (position.x > gameRef.size.x) {
      removeFromParent();
    }
  }
}
