import 'dart:async';
import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flame_audio/flame_audio.dart' as audio;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:space_shooter/components/player.dart';

import 'components/background.dart';
import 'components/enemyManager.dart';
import 'constants.dart';

class SpaceShooter extends FlameGame
    with KeyboardEvents, HasCollisionDetection {
  late Player _player;
  late BackgroundComponent _background;
  late BackgroundComponent _foregroundPlanet;
  late BackgroundComponent _foregroundPlanet2;
  late EnemyManager _enemyManager;
  late TextComponent _scoreText;
  late TextComponent _healthText;
  late TextComponent _controlsText;
  late TextComponent _gameOverText;
  bool _isGameOver = false;
  bool hasInteracted = false;

  @override
  FutureOr<void> onLoad() async {
    // Load background
    _background = BackgroundComponent(
      Vector2(size.x * 2, size.y),
      'Background.jpg',
      true,
      Vector2(0, 0),
    );
    add(_background);

    // Load foreground objects
    _foregroundPlanet = BackgroundComponent(
      Vector2(foregroundPlanetScaleX, foregroundPlanetScaleY),
      'planet.png',
      false,
      Vector2(planetStartX, planetStartY),
    );
    add(_foregroundPlanet);

    _foregroundPlanet2 = BackgroundComponent(
      Vector2(foregroundPlanetScaleX2, foregroundPlanetScaleY2),
      'planet.png',
      false,
      Vector2(planetStartX2, planetStartY2),
    );
    add(_foregroundPlanet2);

    // Load player
    _player = Player();
    add(_player);

    // Initialize enemy object pool and spawner
    _enemyManager = EnemyManager();
    add(_enemyManager);

    // Pre-load audio into cache
    await audio.FlameAudio.audioCache.loadAll([
      'laser.wav',
      'hit.wav',
      'music.mp3',
    ]);

    // Add score and health UI
    _scoreText = TextComponent(
      text: '0',
      position: Vector2(10, 10),
      scale: Vector2.all(2),
    );
    add(_scoreText);

    _healthText = TextComponent(
      text: '3',
      scale: Vector2.all(2),
      position: Vector2(10, (_scoreText.position.y + _scoreText.height) * 1.5),
    );
    add(_healthText);

    _controlsText = TextComponent(
      text: 'W/S or Arrow Keys to move\nHold space to shoot',
      scale: Vector2.all(1),
      position: Vector2(
        10,
        (_healthText.position.y + _healthText.height) * 1.5,
      ),
    );
    add(_controlsText);
  }

  /// Handles keyboard events for player movement and shooting.
  @override
  KeyEventResult onKeyEvent(
    KeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    if (!hasInteracted) {
      hasInteracted = true;
      _player.startShooting();
      audio.FlameAudio.loopLongAudio('music.mp3', volume: 0.1);
    }

    final isKeyHolding = event is KeyRepeatEvent;
    final isKeyDown = event is KeyDownEvent;

    if (isKeyHolding || isKeyDown) {
      if ((keysPressed.contains(LogicalKeyboardKey.arrowUp) ||
              keysPressed.contains(LogicalKeyboardKey.keyW)) &&
          _player.playerState == PlayerState.alive) {
        _player.moveUp();
      }
      if ((keysPressed.contains(LogicalKeyboardKey.arrowDown) ||
              keysPressed.contains(LogicalKeyboardKey.keyS)) &&
          _player.playerState == PlayerState.alive) {
        _player.moveDown();
      }
      if (keysPressed.contains(LogicalKeyboardKey.enter) &&
          _player.playerState == PlayerState.dead) {
        _player.reset();
        _enemyManager.reset();
        _resetGame();
      }
      return KeyEventResult.handled;
    } else {
      _player.stopMoving();
      return KeyEventResult.handled;
    }
  }

  @override
  void update(double dt) {
    super.update(dt);

    _scoreText.text = _player.getScore();
    _healthText.text = _player.getHealth();

    /// If player is dead, remove all enemies and show game over text.
    if (_player.playerState == PlayerState.dead) {
      if (!_isGameOver) {
        _isGameOver = true;
        _player.stopShooting();
        _enemyManager.clearEnemies();
        _gameOverText = TextComponent(
          text: 'GAME OVER! \n Press Enter to Restart',
          scale: Vector2.all(2),
          position: Vector2(size.x / 3.75, size.y / 2),
        );
        add(_gameOverText);
        _scoreText.position = Vector2(size.x / 2, size.y / 4);
      }
    }
  }

  /// Resets the game to initial state.
  void _resetGame() {
    _isGameOver = false;
    _gameOverText.removeFromParent();
    _scoreText.position = Vector2(10, 10);
  }
}
