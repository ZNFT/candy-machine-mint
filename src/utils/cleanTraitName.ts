export const cleanTraitName = (name: string | undefined) => {
  if(!name) return
  const regexName = name.replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, '').toUpperCase();
  return regexName
}