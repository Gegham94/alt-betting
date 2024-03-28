// use in keydown event and type number input
export const blockNumbersChars = (event: any) =>{
  ['e', 'E', '+', '-', '.', ',', 'ArrowUp', 'ArrowDown'].includes(event.key) && event.preventDefault();
}

export function fixDecimalPlaces(number:number, maxDecimal:number):number {
  let numberString = number.toString();
  if (numberString.includes('.') && numberString.split('.')[1].length > maxDecimal) {
    return Number(number.toFixed(maxDecimal));
  } else {
    return number;
  }
}

export const  findParentScrollContainer = (element:HTMLElement):null | HTMLElement => {
  let parent = element?.parentNode as HTMLElement | null;
  while (parent !== null) {
    if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement | null;
  }
  return null;
};
