export type WorkoutType = 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
export type WorkoutStatus = 'completed' | 'missed';
export type GoalType = 'Giảm cân' | 'Tăng cơ' | 'Cải thiện sức bền' | 'Khác';
export type GoalStatus = 'Đang thực hiện' | 'Đã đạt' | 'Đã hủy';
export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';
export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';

export interface WorkoutLog {
  id: number;
  date: string;
  type: WorkoutType;
  duration: number;
  calories: number;
  note?: string;
  status: WorkoutStatus;
}

export interface HealthLog {
  id: number;
  date: string;
  weight: number;
  height: number;
  restingHeartRate: number;
  sleepHours: number;
}

export interface GoalItem {
  id: number;
  name: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  deadline: string;
  status: GoalStatus;
}

export interface ExerciseItem {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
  description: string;
  details: string;
  caloriesPerHour: number;
}

export const workoutTypeOptions: WorkoutType[] = ['Cardio', 'Strength', 'Yoga', 'HIIT', 'Other'];
export const workoutStatusOptions: WorkoutStatus[] = ['completed', 'missed'];
export const goalTypeOptions: GoalType[] = ['Giảm cân', 'Tăng cơ', 'Cải thiện sức bền', 'Khác'];
export const goalStatusOptions: GoalStatus[] = ['Đang thực hiện', 'Đã đạt', 'Đã hủy'];
export const muscleOptions: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];
export const difficultyOptions: Difficulty[] = ['Dễ', 'Trung bình', 'Khó'];
