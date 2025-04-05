import 'package:flame/components.dart';
import 'package:flame/experimental.dart';
import 'package:space_shooter/components/enemy.dart';
import 'package:space_shooter/constants.dart';

/// Manages the spawning and lifecycle of enemy ships in the game.
class EnemyManager extends Component with HasGameRef {
  /// List of all enemies currently alive, allows for easy access when clearing enemies.
  final List<Enemy> enemies = [];

  /// Component responsible for spawning new enemies at regular intervals.
  late final SpawnComponent enemySpawner;

  @override
  Future<void> onLoad() async {
    enemySpawner = SpawnComponent(
      factory: (index) {
        final enemy = Enemy();
        addEnemy(enemy);
        return enemy;
      },
      period: enemySpawnRate,
      autoStart: true,
      area: Rectangle.fromLTWH(
        gameRef.size.x,
        100,
        gameRef.size.x + 10,
        gameRef.size.y - 100,
      ),
    );
    add(enemySpawner);
  }

  @override
  void update(double dt) {
    super.update(dt);
    enemies.removeWhere((enemy) => enemy.isRemoved);
  }

  /// Adds a new enemy to the managed list.
  void addEnemy(Enemy enemy) {
    enemies.add(enemy);
  }

  /// Clears all enemies from the game and stops them from spawning.
  void clearEnemies() {
    enemySpawner.timer.stop();
    for (final enemy in enemies) {
      enemy.stopShooting();
      enemy.removeFromParent();
    }
    enemies.clear();
  }

  /// Restarts enemy spawning after it has been stopped.
  void reset() {
    enemySpawner.timer.start();
  }
}
