import 'dart:async';
import 'dart:math';
import 'package:flame/components.dart';
import 'package:space_shooter/constants.dart';
import 'package:flame/effects.dart';
import 'package:flame/rendering.dart';

/// A component that handles scrolling background and foreground elements.
///
/// Supports different behaviors for main background vs foreground elements,
/// including scroll speeds, anchoring, and visual effects.
class BackgroundComponent extends SpriteComponent with HasGameRef {
  /// The asset path for the sprite image.
  final String path;

  /// Whether this is the main background (true) or a foreground element (false).
  final bool isMainBackground;

  /// Creates a new background component.
  ///
  /// [size] determines the dimensions of the component.
  /// [path] specifies the sprite asset to load.
  /// [isMainBackground] controls behavior and effects.
  /// [initialPosition] sets the starting position.
  BackgroundComponent(
    Vector2 size,
    this.path,
    this.isMainBackground,
    Vector2 initialPosition,
  ) : super(
        size: size,
        position: initialPosition,
        anchor: isMainBackground ? Anchor.topLeft : Anchor.center,
      );

  @override
  FutureOr<void> onLoad() async {
    sprite = await Sprite.load(path);

    if (!isMainBackground) {
      add(
        RotateEffect.by(pi * 2, EffectController(duration: 20, infinite: true)),
      );
      decorator.addLast(PaintDecorator.blur(2));
    }
  }

  @override
  void update(double dt) {
    super.update(dt);

    if (isMainBackground) {
      position.x -= backgroundScrollSpeed * dt;
      if (position.x <= -size.x / 2) {
        position.x = 0;
      }
    } else {
      position.x -= foregroundScrollSpeed * dt;
      if (position.x <= -size.x) {
        position.x = gameRef.size.x + size.x / 2;
      }
    }
  }
}
