import type { ExerciseItem, GoalItem, HealthLog, WorkoutLog } from './types';

const WORKOUT_KEY = 'thuchanh8_workout_logs';
const HEALTH_KEY = 'thuchanh8_health_logs';
const GOAL_KEY = 'thuchanh8_goals';
const EXERCISE_KEY = 'thuchanh8_exercises';

const defaultWorkouts: WorkoutLog[] = [
  { id: 1, date: '2026-04-02', type: 'Cardio', duration: 40, calories: 320, note: 'Chạy bộ công viên', status: 'completed' },
  { id: 2, date: '2026-04-05', type: 'Strength', duration: 55, calories: 410, note: 'Tập thân trên', status: 'completed' },
  { id: 3, date: '2026-04-09', type: 'HIIT', duration: 30, calories: 360, note: 'HIIT tại nhà', status: 'completed' },
  { id: 4, date: '2026-04-14', type: 'Yoga', duration: 45, calories: 180, note: 'Thư giãn cơ', status: 'completed' },
  { id: 5, date: '2026-04-18', type: 'Cardio', duration: 35, calories: 280, note: 'Đạp xe', status: 'missed' },
  { id: 6, date: '2026-04-22', type: 'Strength', duration: 60, calories: 430, note: 'Leg day', status: 'completed' },
  { id: 7, date: '2026-04-25', type: 'Other', duration: 50, calories: 300, note: 'Bơi nhẹ', status: 'completed' },
];

const defaultHealthLogs: HealthLog[] = [
  { id: 1, date: '2026-03-30', weight: 70.2, height: 172, restingHeartRate: 76, sleepHours: 6.5 },
  { id: 2, date: '2026-04-06', weight: 69.9, height: 172, restingHeartRate: 74, sleepHours: 7.0 },
  { id: 3, date: '2026-04-13', weight: 69.5, height: 172, restingHeartRate: 73, sleepHours: 7.2 },
  { id: 4, date: '2026-04-20', weight: 69.1, height: 172, restingHeartRate: 72, sleepHours: 7.4 },
  { id: 5, date: '2026-04-27', weight: 68.8, height: 172, restingHeartRate: 71, sleepHours: 7.6 },
];

const defaultGoals: GoalItem[] = [
  { id: 1, name: 'Giảm 3kg trong 2 tháng', type: 'Giảm cân', targetValue: 3, currentValue: 1.4, deadline: '2026-06-20', status: 'Đang thực hiện' },
  { id: 2, name: 'Hít đất 50 cái liên tục', type: 'Tăng cơ', targetValue: 50, currentValue: 35, deadline: '2026-05-30', status: 'Đang thực hiện' },
  { id: 3, name: 'Chạy 5km dưới 30 phút', type: 'Cải thiện sức bền', targetValue: 30, currentValue: 33, deadline: '2026-07-01', status: 'Đang thực hiện' },
];

const defaultExercises: ExerciseItem[] = [
  { id: 1, name: 'Push-up', muscleGroup: 'Chest', difficulty: 'Dễ', description: 'Bài tập ngực cơ bản.', details: 'Giữ thân người thẳng, hạ người xuống đến khi khuỷu tay khoảng 90 độ rồi đẩy lên.', caloriesPerHour: 350 },
  { id: 2, name: 'Squat', muscleGroup: 'Legs', difficulty: 'Trung bình', description: 'Tăng sức mạnh chân và mông.', details: 'Đứng rộng bằng vai, hạ hông xuống như ngồi ghế, giữ lưng thẳng rồi đứng lên.', caloriesPerHour: 420 },
  { id: 3, name: 'Plank', muscleGroup: 'Core', difficulty: 'Dễ', description: 'Tăng ổn định cơ lõi.', details: 'Giữ cơ thể trên khuỷu tay và mũi chân, siết bụng, không võng lưng.', caloriesPerHour: 250 },
  { id: 4, name: 'Deadlift', muscleGroup: 'Back', difficulty: 'Khó', description: 'Bài tập tổng hợp mạnh mẽ.', details: 'Giữ thanh tạ sát người, nâng bằng hông và chân, giữ cột sống trung tính.', caloriesPerHour: 500 },
  { id: 5, name: 'Shoulder Press', muscleGroup: 'Shoulders', difficulty: 'Trung bình', description: 'Phát triển vai và tay sau.', details: 'Đẩy tạ từ vai lên cao qua đầu, kiểm soát chuyển động khi hạ xuống.', caloriesPerHour: 390 },
  { id: 6, name: 'Burpee', muscleGroup: 'Full Body', difficulty: 'Khó', description: 'Bài tập đốt calo toàn thân.', details: 'Kết hợp squat, chống đẩy và bật nhảy liên tục với nhịp cao.', caloriesPerHour: 700 },
];

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadWorkouts = () => readStorage(WORKOUT_KEY, defaultWorkouts);
export const saveWorkouts = (value: WorkoutLog[]) => writeStorage(WORKOUT_KEY, value);
export const loadHealthLogs = () => readStorage(HEALTH_KEY, defaultHealthLogs);
export const saveHealthLogs = (value: HealthLog[]) => writeStorage(HEALTH_KEY, value);
export const loadGoals = () => readStorage(GOAL_KEY, defaultGoals);
export const saveGoals = (value: GoalItem[]) => writeStorage(GOAL_KEY, value);
export const loadExercises = () => readStorage(EXERCISE_KEY, defaultExercises);
export const saveExercises = (value: ExerciseItem[]) => writeStorage(EXERCISE_KEY, value);
