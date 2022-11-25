// ✖⚪
// Создаем матрицу, заполняем ее нулями
let winLine = 4;
let arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let last_bot = [];
let last_user = [];
let bot_future = [];
let space = 1;

bot_first();

function random(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Выводим в алерте
function printMatrix() {
  let out = '';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      out += arr[i][j] + ' ';
    }
    out += '\n';
  }
  alert(out);
}

// Отслеживание клика по блоку
$('.block').on('click', function () {
  let id = $(this).attr('value');
  let i = id[0];
  let j = id[1];
  userTurn(i, j);
});

function tic() {
  space++;
  if (space == 100) nobody();
}

// Ход игрока
function userTurn(i, j) {
  if (arr[i][j] == 1 || arr[i][j] == 2) return;
  arr[i][j] = 1;
  last_user[0] = i;
  last_user[1] = j;
  drawMap();
  tic();
  bot();
}

// Отображает текущее положение крестиков и ноликов
function drawMap() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (arr[i][j] == 1) {
        $("div[value='" + i + j + "']").text('✖');
      }
      if (arr[i][j] == 2) {
        $("div[value='" + i + j + "']").text('⚪');
      }
    }
  }
  checkLines();
}

// Проверка комбинаций на победу
function checkLines() {
  let combo = 0;
  let comboBot = 0;

  // Проходим по горизонтали, чекаем юзера
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] == 1 && arr[i][j] == arr[i][j + 1]) ++combo;
      if (arr[i][j] != 1) combo = 0;

      if (arr[i][j] == 2 && arr[i][j] == arr[i][j + 1]) ++comboBot;
      if (arr[i][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
    }

    combo = 0;
    comboBot = 0;
  }

  combo = 0;
  comboBot = 0;

  //Проходим по вертикали, чекаем юзера
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 9; i++) {
      if (arr[i][j] == 1 && arr[i][j] == arr[i + 1][j]) ++combo;
      if (arr[i][j] != 1) combo = 0;

      if (arr[i][j] == 2 && arr[i][j] == arr[i + 1][j]) ++comboBot;
      if (arr[i][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
    }
    combo = 0;
    comboBot = 0;
  }

  // Проходим по главной диагонали и ниже. Слева-направо \
  let e = 9;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < e; j++) {
      if (arr[j + i][j] == 1 && arr[j + i][j] == arr[j + i + 1][j + 1]) ++combo;
      if (arr[j + i][j] != 1) combo = 0;

      if (arr[j + i][j] == 2 && arr[j + i][j] == arr[j + i + 1][j + 1])
        ++comboBot;
      if (arr[j + i][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
    }
    e--;
    combo = 0;
    comboBot = 0;
  }

  // Проходим выше главной диагонали. Слева-направо \
  e = 1;
  for (let i = 0; i < 8; i++) {
    for (let j = e; j < 10; j++) {
      if (arr[j - e][j] == 1 && arr[j - e][j] == arr[j - e + 1][j + 1]) ++combo;
      if (arr[j - e][j] != 1) combo = 0;

      if (arr[j - e][j] == 2 && arr[j - e][j] == arr[j - e + 1][j + 1])
        ++comboBot;
      if (arr[j - e][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
    }
    e++;
    combo = 0;
    comboBot = 0;
  }

  // Проходим по побочной диагонали и выше. Справа-налево /
  e = 9;
  for (let i = 0; i < 8; i++) {
    for (let j = e; j > 0; j--) {
      if (arr[e - j][j] == 1 && arr[e - j][j] == arr[e - j + 1][j - 1]) ++combo;
      if (arr[e - j][j] != 1) combo = 0;

      if (arr[e - j][j] == 2 && arr[e - j][j] == arr[e - j + 1][j - 1])
        ++comboBot;
      if (arr[e - j][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
    }
    e--;
    combo = 0;
    comboBot = 0;
  }

  // Проходим ниже побочной диагонали. Справа-налево /
  e = 1;
  let k = 1,
    r = 1;
  for (let i = 0; i < 7; i++) {
    for (let j = 9; j > e; j--) {
      if (arr[k][j] == 1 && arr[k][j] == arr[k + 1][j - 1]) ++combo;
      if (arr[k][j] != 1) combo = 0;

      if (arr[k][j] == 2 && arr[k][j] == arr[k + 1][j - 1]) ++comboBot;
      if (arr[k][j] != 2) comboBot = 0;

      if (comboBot >= winLine) {
        lose();
        return;
      }

      if (combo >= winLine) {
        win();
        return;
      }
      k++;
    }
    e++;
    r++;
    k = r;

    combo = 0;
    comboBot = 0;
  }
}

// Первый ход бота, вызывается 1 раз
function bot_first() {
  let rand = Math.floor(Math.random() * 100) + 1;
  let x = 1;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (rand == x) {
        arr[i][j] = 2;
        last_bot.push(i);
        last_bot.push(j);
        drawMap();
        return;
      }
      x++;
    }
  }
}

// Основная функция бота
function bot() {
  maybe = getCoords(last_bot);
  if (maybe.length == 0) {
    // Если бот в тупике, ищет новую точку
    last_bot = [];
    let boo = true;
    while (boo) {
      let i = random(0, 9);
      let j = random(0, 9);
      if (arr[i][j] == 0) {
        last_bot[0] = i;
        last_bot[1] = j;
        arr[i][j] = 2;
        boo = false;
      }
    }
  } else {
    let rand = random(0, maybe.length - 1);
    let botGo = maybe[rand];

    let i = botGo[0];
    let j = botGo[1];
    arr[i][j] = 2;
  }

  drawMap();
  tic();
}

function getCoords(last_bot) {
  let maybe = []; // Массив возможных ходов
  let allready = false;
  // Если бот не на гранях
  if (
    last_bot[0] != 0 &&
    last_bot[0] != 9 &&
    last_bot[1] != 0 &&
    last_bot[1] != 9
  ) {
    //_____________
    //| 1 | 2 | 3 |
    //|___|___|___|
    //| 4 | B | 5 |
    //|___|___|___|
    //| 6 | 7 | 8 |
    //|___|___|___|

    if (arr[last_bot[0] - 1][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] - 1 + '' + (last_bot[1] - 1)); // 1
    if (arr[last_bot[0] - 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] - 1 + '' + last_bot[1]); // 2
    if (arr[last_bot[0] - 1][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] - 1 + '' + (last_bot[1] + 1)); // 3

    if (arr[last_bot[0]][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] - 1)); // 4
    if (arr[last_bot[0]][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] + 1)); // 5

    if (arr[last_bot[0] + 1][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] + 1 + '' + (last_bot[1] - 1)); // 6
    if (arr[last_bot[0] + 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] + 1 + '' + last_bot[1]); // 7
    if (arr[last_bot[0] + 1][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] + 1 + '' + (last_bot[1] + 1)); // 8
    allready = true;
  } else if (last_bot[0] == 0 && last_bot[1] == 0) {
    // Если в верхнем левом углу
    if (arr[last_bot[0]][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] + 1));
    if (arr[last_bot[0] + 1][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] + 1 + '' + (last_bot[1] + 1));
    if (arr[last_bot[0] + 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] + 1 + '' + last_bot[1]);
    allready = true;
  } else if (last_bot[0] == 0 && last_bot[1] == 9) {
    // Если в верхнем правом углу
    if (arr[last_bot[0]][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] - 1));
    if (arr[last_bot[0] + 1][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] + 1 + '' + (last_bot[1] - 1));
    if (arr[last_bot[0] + 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] + 1 + '' + last_bot[1]);
    allready = true;
  } else if (last_bot[0] == 9 && last_bot[1] == 0) {
    // Если в нижнем левом углу
    if (arr[last_bot[0] - 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] - 1 + '' + last_bot[1]);
    if (arr[last_bot[0] - 1][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] - 1 + '' + (last_bot[1] + 1));
    if (arr[last_bot[0]][last_bot[1] + 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] + 1));
    allready = true;
  } else if (last_bot[0] == 9 && last_bot[1] == 9) {
    // Если в нижнем правом углу
    if (arr[last_bot[0] - 1][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] - 1 + '' + (last_bot[1] - 1));
    if (arr[last_bot[0] - 1][last_bot[1]] == 0)
      maybe.push(last_bot[0] - 1 + '' + last_bot[1]);
    if (arr[last_bot[0]][last_bot[1] - 1] == 0)
      maybe.push(last_bot[0] + '' + (last_bot[1] - 1));
    allready = true;
  }
  if (!allready) {
    if (last_bot[0] == 0) {
      // Если на верхней грани
      if (arr[last_bot[0]][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] - 1));
      if (arr[last_bot[0]][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] + 1));
      if (arr[last_bot[0] + 1][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] + 1 + '' + (last_bot[1] - 1));
      if (arr[last_bot[0] + 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] + 1 + '' + last_bot[1]);
      if (arr[last_bot[0] + 1][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] + 1 + '' + (last_bot[1] + 1));
    } else if (last_bot[0] == 9) {
      // Если на нижней
      if (arr[last_bot[0] - 1][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] - 1 + '' + (last_bot[1] - 1));
      if (arr[last_bot[0] - 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] - 1 + '' + last_bot[1]);
      if (arr[last_bot[0] - 1][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] - 1 + '' + (last_bot[1] + 1));
      if (arr[last_bot[0]][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] - 1));
      if (arr[last_bot[0]][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] + 1));
    } else if (last_bot[1] == 0) {
      // Если слева
      if (arr[last_bot[0] - 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] - 1 + '' + last_bot[1]);
      if (arr[last_bot[0] - 1][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] - 1 + '' + (last_bot[1] + 1));
      if (arr[last_bot[0] + 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] + 1 + '' + last_bot[1]);
      if (arr[last_bot[0] + 1][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] + 1 + '' + (last_bot[1] + 1));
      if (arr[last_bot[0]][last_bot[1] + 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] + 1));
    } else if (last_bot[1] == 9) {
      // Если справа
      if (arr[last_bot[0] - 1][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] - 1 + '' + (last_bot[1] - 1));
      if (arr[last_bot[0] - 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] - 1 + '' + last_bot[1]);
      if (arr[last_bot[0]][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] + '' + (last_bot[1] - 1));
      if (arr[last_bot[0] + 1][last_bot[1] - 1] == 0)
        maybe.push(last_bot[0] + 1 + '' + (last_bot[1] - 1));
      if (arr[last_bot[0] + 1][last_bot[1]] == 0)
        maybe.push(last_bot[0] + 1 + '' + last_bot[1]);
    }
  }
  return maybe;
}

function win() {
  alert('Победа!');
  window.location.reload(false);
}

function lose() {
  alert('Поражение(');
  window.location.reload(false);
}

function nobody() {
  alert('Ничья');
  window.location.reload(false);
}
