import { Project, AssessmentAnswer } from '../types';
import {
  DEMO_PROJECTS,
  DEMO_PROJECT_PARIS_ANSWERS,
  DEMO_PROJECT_1_ANSWERS,
  DEMO_PROJECT_2_ANSWERS
} from '../data/demoProjects';

const PROJECTS_KEY = 'agri4sdgs_projects';
const ANSWERS_KEY_PREFIX = 'agri4sdgs_answers_';
const ACTIVE_PROJECT_KEY = 'agri4sdgs_active_project_id';

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      saveProjects(DEMO_PROJECTS);
      saveAssessmentAnswers('proj-paris-agroecology', DEMO_PROJECT_PARIS_ANSWERS);
      saveAssessmentAnswers('proj-green-valley', DEMO_PROJECT_1_ANSWERS);
      saveAssessmentAnswers('proj-regenerative-soil', DEMO_PROJECT_2_ANSWERS);
      return DEMO_PROJECTS;
    }
    const parsed: Project[] = JSON.parse(raw);
    // Ensure the new Paris project is present if older localStorage exists
    const hasParis = parsed.some(p => p.id === 'proj-paris-agroecology');
    if (!hasParis) {
      const parisProj = DEMO_PROJECTS.find(p => p.id === 'proj-paris-agroecology');
      if (parisProj) {
        parsed.unshift(parisProj);
        saveProjects(parsed);
        saveAssessmentAnswers('proj-paris-agroecology', DEMO_PROJECT_PARIS_ANSWERS);
      }
    }
    return parsed;
  } catch {
    return DEMO_PROJECTS;
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
}

export function getProjectById(id: string): Project | undefined {
  const projects = getStoredProjects();
  return projects.find(p => p.id === id);
}

export function saveProject(project: Project): void {
  const projects = getStoredProjects();
  const existingIdx = projects.findIndex(p => p.id === project.id);
  if (existingIdx >= 0) {
    projects[existingIdx] = project;
  } else {
    projects.unshift(project);
  }
  saveProjects(projects);
}

export function getAssessmentAnswers(projectId: string): Record<string, AssessmentAnswer> {
  try {
    const raw = localStorage.getItem(`${ANSWERS_KEY_PREFIX}${projectId}`);
    if (!raw) {
      if (projectId === 'proj-paris-agroecology') {
        saveAssessmentAnswers(projectId, DEMO_PROJECT_PARIS_ANSWERS);
        return DEMO_PROJECT_PARIS_ANSWERS;
      }
      if (projectId === 'proj-green-valley') {
        saveAssessmentAnswers(projectId, DEMO_PROJECT_1_ANSWERS);
        return DEMO_PROJECT_1_ANSWERS;
      }
      if (projectId === 'proj-regenerative-soil') {
        saveAssessmentAnswers(projectId, DEMO_PROJECT_2_ANSWERS);
        return DEMO_PROJECT_2_ANSWERS;
      }
      return {};
    }
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveAssessmentAnswers(
  projectId: string,
  answers: Record<string, AssessmentAnswer>
): void {
  try {
    localStorage.setItem(`${ANSWERS_KEY_PREFIX}${projectId}`, JSON.stringify(answers));
  } catch (err) {
    console.error('Failed to save assessment answers to localStorage:', err);
  }
}

export function getActiveProjectId(): string {
  return localStorage.getItem(ACTIVE_PROJECT_KEY) || 'proj-paris-agroecology';
}

export function setActiveProjectId(id: string): void {
  localStorage.setItem(ACTIVE_PROJECT_KEY, id);
}

export function resetDemoData(): void {
  try {
    localStorage.clear();
    saveProjects(DEMO_PROJECTS);
    saveAssessmentAnswers('proj-paris-agroecology', DEMO_PROJECT_PARIS_ANSWERS);
    saveAssessmentAnswers('proj-green-valley', DEMO_PROJECT_1_ANSWERS);
    saveAssessmentAnswers('proj-regenerative-soil', DEMO_PROJECT_2_ANSWERS);
    setActiveProjectId('proj-paris-agroecology');
  } catch (err) {
    console.error('Failed to reset demo data:', err);
  }
}
