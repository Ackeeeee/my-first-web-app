// ここからコードを書いてください
export function setupConverter() {
  // formの各要素を取得
  const converterForm = document.querySelector(".converter-form");
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 長さ単位の一覧
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 長さ単位の一覧を、変換元・変換先単位の選択肢に追加
  lengthUnit.forEach((unit) => {
    const fromElement = document.createElement("option");
    fromElement.value = unit.base;
    fromElement.textContent = unit.name;

    const toElement = document.createElement("option");
    toElement.value = unit.base;
    toElement.textContent = unit.name;

    converterFrom.appendChild(fromElement);
    converterTo.appendChild(toElement);
  });

  // From:meter To:kilometer を初期選択状態とする
  converterFrom.selectedIndex = 0;
  converterTo.selectedIndex = 1;

  convert();

  converterForm.addEventListener("input", () => {
    convert();
  });
}

export function convert() {
  // 計算に使う値を取得
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 入力値が数字か判定
  const inputValue = parseFloat(converterInput.value);
  if (isNaN(inputValue)) {
    // 入力値が数字でない場合
    // エラーを表示
    converterResult.textContent = "Please enter a valid number";
    return;
  } else {
    // 入力値が数字の場合
    // 選択されている変換元・変換先単位を取得
    const selectedFrom = converterFrom.options[converterFrom.selectedIndex];
    const selectedTo = converterTo.options[converterTo.selectedIndex];

    //結果を計算・表示
    const resultValue = (inputValue * selectedFrom.value) / selectedTo.value;
    converterResult.textContent = `${inputValue} ${selectedFrom.textContent} = ${resultValue.toFixed(3)} ${selectedTo.textContent}`;
  }
}
