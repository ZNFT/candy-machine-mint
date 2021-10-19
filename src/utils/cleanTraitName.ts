export const cleanTraitName = (name: string | number | undefined, category: string) => {
  if(typeof name === 'number'){
    return '';
  }
  if(category === 'Damage' && name === 'None'){
    return 'NONE '
  } else if(category === 'Equipment' && name === 'None'){
    return 'NONE'
  }
  if(!name) return
  const regexName = name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '').toUpperCase();
  return regexName
}