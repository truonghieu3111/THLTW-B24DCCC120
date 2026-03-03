import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { loadData, saveData } from './storage';
import SubjectManager from './subjectManager';
import StudySessionManager from './studySessionManager';
import GoalManager from './goalManager';

const { TabPane } = Tabs;

export default function thuchanh1_bai2() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    setSubjects(loadData('subjects', ['Toán', 'Văn', 'Anh']));
    setSessions(loadData('sessions', []));
    setGoals(loadData('goals', []));
  }, []);

  useEffect(() => saveData('subjects', subjects), [subjects]);
  useEffect(() => saveData('sessions', sessions), [sessions]);
  useEffect(() => saveData('goals', goals), [goals]);

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Môn học" key="1">
        <SubjectManager subjects={subjects} setSubjects={setSubjects} />
      </TabPane>

      <TabPane tab="Lịch học" key="2">
        <StudySessionManager
          subjects={subjects}
          sessions={sessions}
          setSessions={setSessions}
        />
      </TabPane>

      <TabPane tab="Mục tiêu tháng" key="3">
        <GoalManager
          goals={goals}
          setGoals={setGoals}
          sessions={sessions}
        />
      </TabPane>
    </Tabs>
  );
}