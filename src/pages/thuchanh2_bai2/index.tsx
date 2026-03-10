import { useState } from 'react'
import QuestionControl from './questionControl'
import QuestionList from './questionList'
import ExamControl from './examControl'
import ExamList from './examList'
import KnowledgeList from './knowledgeList'
import SubjectList from './subjectList'
import { questions, filterQuestions } from './questionLogic'
import { knowledgeBlocks, subjects } from './questionLogic'

export default function Thuchanh2Bai2() {

  const [list, setList] = useState(questions)
  const [exams, setExams] = useState<any[]>([])

  const search = (subject: string, difficulty: string) => {
    setList(filterQuestions(questions, subject, difficulty))
  }

  const createExam = () => {
    const exam = {
      id: Date.now(),
      questions: list.slice(0,3)
    }

    setExams([exam, ...exams])
  }

  return (
    <div>
      <h2>Danh mục khối kiến thức</h2>
      <KnowledgeList data={knowledgeBlocks} />

      <h2>Danh mục môn học</h2>
      <SubjectList data={subjects} />

      <h2>Ngân hàng câu hỏi</h2>

      <QuestionControl onSearch={search} />

      <QuestionList questions={list} />

      <h2>Tạo đề</h2>

      <ExamControl onCreate={createExam} />

      <ExamList exams={exams} />

    </div>
  )
}