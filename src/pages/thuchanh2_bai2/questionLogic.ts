export const knowledgeBlocks = [
  { id: 1, name: "Tổng quan" },
  { id: 2, name: "Chuyên sâu" }
];

export const subjects = [
  { code: "WEB101", name: "Lập trình Web", credits: 3 },
  { code: "DB101", name: "Cơ sở dữ liệu", credits: 3 }
];

export const questions = [
  {
    id: 1,
    subject: "WEB101",
    content: "Trình bày kiến trúc MVC",
    difficulty: "Trung bình",
    knowledge: "Tổng quan"
  },
  {
    id: 2,
    subject: "WEB101",
    content: "Giải thích REST API",
    difficulty: "Dễ",
    knowledge: "Chuyên sâu"
  }
];

export function filterQuestions(list: any[], subject: string, difficulty: string) {
  return list.filter(
    q =>
      (subject === "" || q.subject === subject) &&
      (difficulty === "" || q.difficulty === difficulty)
  );
}