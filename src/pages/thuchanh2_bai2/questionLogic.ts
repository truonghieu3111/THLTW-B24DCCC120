export const questions = [
  {
    id: 1,
    subject: "Web",
    content: "Trình bày kiến trúc MVC",
    difficulty: "Trung bình",
    knowledge: "Tổng quan"
  },
  {
    id: 2,
    subject: "Web",
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