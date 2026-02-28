import * as SQLite from "expo-sqlite";

let db;

export async function init() {
  db = await SQLite.openDatabaseAsync("places.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    );
  `);
}

export async function insertPlace(place) {
  const { title, imageUri, address, location } = place;
  const { lat, lng } = location;

  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng)
     VALUES (?, ?, ?, ?, ?)`,
    [title, imageUri, address, lat, lng],
  );

  return result.lastInsertRowId;
}
