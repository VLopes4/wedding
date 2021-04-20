export function phoneMask(value: any) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
  } 

export function zipCodeMask(value: any){
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export function moneyMask(value: any){
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{1})(\d{17})$/, '$1.$2')
    .replace(/(\d{1})(\d{13})$/, '$1.$2')
    .replace(/(\d{1})(\d{10})$/, '$1.$2')
    .replace(/(\d{1})(\d{7})$/, '$1.$2')
    .replace(/(\d{1})(\d{1,4})$/, '$1,$2')
}