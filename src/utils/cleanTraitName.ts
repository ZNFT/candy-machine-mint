export const cleanTraitName = (name: string | undefined, category: string) => {
  if(category === 'Damage' && name === 'None'){
    return 'NONE '
  } else if(category === 'Equipment' && name === 'None'){
    return 'NONE'
  }
  if(!name) return
  const regexName = name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '').toUpperCase();
  return regexName
}