class ScriptTest {
    position;
    isWon;
    squares;

    setPosition(position)
    {
        this.position = position;
    }

    setIsWon(isWon)
    {
        this.isWon = isWon;
    }

    setSquares(squares)
    {
        this.squares = squares;
    }

    makeTable() {
        let table = '';
        for (let i = 1; i <= this.squares; i++) {
            table += "<tr>";
            for (let j = 1; j <= this.squares; j++) {
                table += `<td><input type="button" data-position="${j},${i}" value="" class="select"></td>`;
            }
            table += "</tr>";
        }

        return table;
    }

    getPosition(item) {
        this.position.X = parseInt(item.dataset.position.split(',')[0]);
        this.position.Y = parseInt(item.dataset.position.split(',')[1]);
        console.log(this.position);
        console.log(item.value);
        return this.position;
    }

    select(InputSelect) {
        let isX = true;
        this.position = {
            X: null,
            Y: null
        };

        InputSelect.forEach((item) => {
            item.addEventListener('click', () => {
                if (isX && item.value==='') {
                    item.style.color = 'blue';
                    item.value = "x";
                    isX = false;
                    this.getPosition(item);
                    this.checkLine(this.position.X,this.position.Y);
                    this.checkDiagonal(this.position.X,this.position.Y);
                    if (this.isWon) alert('Player X WIN!');
                }
                else if (item.value==='') {
                    item.style.color = 'red';
                    item.value = "o";
                    isX = true;
                    this.getPosition(item);
                    this.checkLine(this.position.X,this.position.Y);
                    this.checkDiagonal(this.position.X,this.position.Y);
                    if (this.isWon) alert('Player O WIN!');
                }
            });
        });
    }

    checkDiagonal(a, b) {
        // Check Main Diagonal
        for (let i=b-2; i<=b+2; i++) {
            let select1 = document.querySelector(`input[data-position="${(i-2)+(a-b)},${i-2}"]`);
            let select2 = document.querySelector(`input[data-position="${(i-1)+(a-b)},${i-1}"]`);
            let select3 = document.querySelector(`input[data-position="${i+(a-b)},${i}"]`);
            let select4 = document.querySelector(`input[data-position="${(i+1)+(a-b)},${i+1}"]`);
            let select5 = document.querySelector(`input[data-position="${(i+2)+(a-b)},${i+2}"]`);

            if (select1==null || select2==null || select3==null || select4==null || select5==null)
                continue;
            else if (this.checkWinCondition(select1.value, select2.value, select3.value, select4.value, select5.value)) {
                this.isWon = true;
                break;
            }
        }

        // Check Second Diagonal
        for (let i=a-2; i<=a+2; i++) {
            let select1 = document.querySelector(`input[data-position="${i-2},${(a+b)-(i-2)}"]`);
            let select2 = document.querySelector(`input[data-position="${i-1},${(a+b)-(i-1)}"]`);
            let select3 = document.querySelector(`input[data-position="${i},${(a+b)-i}"]`);
            let select4 = document.querySelector(`input[data-position="${i+1},${(a+b)-(i+1)}"]`);
            let select5 = document.querySelector(`input[data-position="${i+2},${(a+b)-(i+2)}"]`);

            if (select1==null || select2==null || select3==null || select4==null || select5==null)
                continue;
            else if (this.checkWinCondition(select1.value, select2.value, select3.value, select4.value, select5.value)) {
                this.isWon = true;
                break;
            }
        }
    }

    checkWinCondition(var1, var2, var3, var4, var5) {
        return (var1 && var2 && var3 && var4 && var5 && var1 === var2 && var1 === var3 && var1 === var4 && var1 === var5);
    }

    checkLine(a, b) {
        // Check Line Horizontal
        for (let i=a-2; i<=a+2; i++) {
            let select1 = document.querySelector(`input[data-position="${i-2},${b}"]`);
            let select2 = document.querySelector(`input[data-position="${i-1},${b}"]`);
            let select3 = document.querySelector(`input[data-position="${i},${b}"]`);
            let select4 = document.querySelector(`input[data-position="${i+1},${b}"]`);
            let select5 = document.querySelector(`input[data-position="${i+2},${b}"]`);

            if (select1==null || select2==null || select3==null || select4==null || select5==null)
                continue;
            else if (this.checkWinCondition(select1.value, select2.value, select3.value, select4.value, select5.value)) {
                this.isWon = true;
                break;
            }
        }

        // Check Line Vertical
        for (let i=b-2; i<=b+2; i++) {
            let select1 = document.querySelector(`input[data-position="${a},${i-2}"]`);
            let select2 = document.querySelector(`input[data-position="${a},${i-1}"]`);
            let select3 = document.querySelector(`input[data-position="${a},${i}"]`);
            let select4 = document.querySelector(`input[data-position="${a},${i+1}"]`);
            let select5 = document.querySelector(`input[data-position="${a},${i+2}"]`);

            if (select1==null || select2==null || select3==null || select4==null || select5==null)
                continue;
            else if (this.checkWinCondition(select1.value, select2.value, select3.value, select4.value, select5.value)) {
                this.isWon = true;
                break;
            }
        }
    }
}

// Khai báo biến
let position = {
    X: null,
    Y: null
  };
  let isWon = false;
  const squares = 20;
  
  caro = new ScriptTest();
  caro.setPosition(position);
  caro.setIsWon(isWon);
  caro.setSquares(squares);
  
  // Tạo bảng và addEvent ngay khi truy cập vào web
  window.onload = () => {
    document.getElementById('table').innerHTML = caro.makeTable();
    caro.select(document.querySelectorAll('input.select'));
  };
  
  // [FUNCTION]: Chơi lại
  function reset() {
    document.getElementById('table').innerHTML = caro.makeTable();
    caro.select(document.querySelectorAll('input.select'));
    caro.setIsWon(false);
  }
  
  // [EVENT]: Reset Button
  document.getElementById('reset').addEventListener('click', reset);