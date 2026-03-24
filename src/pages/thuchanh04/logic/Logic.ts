export function createDiploma(data: any, books: any[]) {

  const book = books.find(b => b.year === data.year);

  if (!book) throw new Error("Không có sổ năm này");

  book.currentNumber += 1;

  return {
    id: Date.now(),
    soVaoSo: book.currentNumber,
    soHieu: "VB" + Date.now(),
    decisionId: data.decisionId,  
    ...data
  };
}

export function searchDiploma(list: any[], query: any) {

  const filled = Object.values(query).filter(v => v);
  if (filled.length < 2) {
    throw new Error("Nhập ít nhất 2 điều kiện");
  }

  return list.filter(d =>
    (!query.soHieu || d.soHieu.includes(query.soHieu)) &&
    (!query.msv || d.msv.includes(query.msv)) &&
    (!query.name || d.name.includes(query.name))
  );
}

export function increaseView(decisions: any[], decisionId: number) {
  return decisions.map(d =>
    d.id === decisionId ? { ...d, views: d.views + 1 } : d
  );
}