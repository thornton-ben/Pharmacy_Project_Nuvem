export const pharmacyGetUrlFormatter = (page: number, id?: number) => {
    let idUrl = ""
  if (id != undefined) {
    idUrl = `&id=${id}`
  }
  return `?page=${page}` + idUrl
}
