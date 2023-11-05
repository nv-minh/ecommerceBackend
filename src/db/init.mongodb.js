"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { host, name, port },
} = require("../configs/config.mongodb");
const connectString = `mongodb://0.0.0.0:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log(`mongodb://0.0.0.0:${port}/${name}`);
      })
      .catch((error) => console.log(error));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
import java.util.Scanner;

public class QuickSort {

  public static void main(String[] args) {
  Scanner input = new Scanner(System.in);
  int n = input.nextInt();
  int[] arr = new int[n];
  for (int i = 0; i < n; i++) {
  arr[i] = input.nextInt();
}

quickSort(arr, 0, n - 1);
  for (int element : arr) {
  System.out.print(element + " ");
}
}

public static void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

public static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

public static void swap(int[] arr, int i, int j) {
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
}