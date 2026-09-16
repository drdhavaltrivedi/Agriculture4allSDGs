import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { CreateProjectScreen } from './components/screens/CreateProjectScreen';
import { AssessmentIntroScreen } from './components/screens/AssessmentIntroScreen';
import { AssessmentFlowScreen } from './components/screens/AssessmentFlowScreen';
import { AssessmentReviewScreen } from './components/screens/AssessmentReviewScreen';
import { ResultsDashboardScreen } from './components/screens/ResultsDashboardScreen';
import { ReportViewScreen } from './components/screens/ReportViewScreen';
import { MethodologyConfigScreen } from './components/screens/MethodologyConfigScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { Project, AssessmentAnswer } from './types';
import {
  getStoredProjects,
  saveProjects,
  saveProject,
  getAssessmentAnswers,
  saveAssessmentAnswers,
  getActiveProjectId,
  setActiveProjectId,
  resetDemoData
} from './services/storage';
import { calculateAssessmentResults } from './services/assessmentEngine';
import { DEMO_PROJECT_1_ANSWERS, DEMO_PROJECT_2_ANSWERS } from './data/demoProjects';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveId] = useState<string>('proj-green-valley');
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswer>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data from local storage
  useEffect(() => {
    const loadedProjects = getStoredProjects();
    const storedActiveId = getActiveProjectId();
    setProjects(loadedProjects);

    const validActiveId = loadedProjects.some(p => p.id === storedActiveId)
      ? storedActiveId
      : loadedProjects[0]?.id || 'proj-green-valley';

    setActiveId(validActiveId);
    setAnswers(getAssessmentAnswers(validActiveId));
  }, []);

  const activeProject = useMemo(() => {
    return projects.find(p => p.id === activeProjectId) || projects[0] || null;
  }, [projects, activeProjectId]);

  // Compute live assessment results whenever activeProject or answers change
  const assessmentResult = useMemo(() => {
    if (!activeProject) return null;
    return calculateAssessmentResults(activeProject, answers);
  }, [activeProject, answers]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectProject = (projectId: string) => {
    setActiveId(projectId);
    setActiveProjectId(projectId);
    setAnswers(getAssessmentAnswers(projectId));
  };

  const handleSaveAnswer = (questionId: string, answer: AssessmentAnswer) => {
    const updated = {
      ...answers,
      [questionId]: answer,
    };
    setAnswers(updated);
    if (activeProject) {
      saveAssessmentAnswers(activeProject.id, updated);
      // Mark project as in_progress if not yet completed
      if (activeProject.status === 'not_started') {
        const updatedProj: Project = { ...activeProject, status: 'in_progress' };
        saveProject(updatedProj);
        setProjects(getStoredProjects());
      }
    }
  };

  const handlePreFillDemoAnswers = () => {
    if (!activeProject) return;
    const sample = activeProject.id === 'proj-regenerative-soil'
      ? DEMO_PROJECT_2_ANSWERS
      : DEMO_PROJECT_1_ANSWERS;

    setAnswers(sample);
    saveAssessmentAnswers(activeProject.id, sample);
    const updatedProj: Project = { ...activeProject, status: 'completed' };
    saveProject(updatedProj);
    setProjects(getStoredProjects());
    showToast('Reference baseline responses loaded.');
  };

  const handleCompleteAssessment = () => {
    if (activeProject) {
      const updatedProj: Project = {
        ...activeProject,
        status: 'completed',
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      saveProject(updatedProj);
      setProjects(getStoredProjects());
    }
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectCreated = (newProject: Project) => {
    saveProject(newProject);
    const refreshed = getStoredProjects();
    setProjects(refreshed);
    setActiveId(newProject.id);
    setActiveProjectId(newProject.id);
    setAnswers({});
    setCurrentScreen('assessment-intro');
    showToast(`Project "${newProject.name}" created!`);
  };

  const handleResetDemo = () => {
    resetDemoData();
    const fresh = getStoredProjects();
    setProjects(fresh);
    setActiveId('proj-green-valley');
    setAnswers(getAssessmentAnswers('proj-green-valley'));
    showToast('Workspace reset to baseline reference data.');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasExistingAnswers = Object.keys(answers).some(
    qId => answers[qId]?.selectedOptionIds?.length > 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcf9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-elevated border border-stone-800 flex items-center gap-2 animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        projects={projects}
        activeProject={activeProject}
        onSelectProject={handleSelectProject}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            projects={projects}
          />
        )}

        {currentScreen === 'projects' && (
          <ProjectsScreen
            projects={projects}
            activeProject={activeProject}
            onSelectProject={handleSelectProject}
            onNavigate={handleNavigate}
            onResetDemo={handleResetDemo}
          />
        )}

        {currentScreen === 'create-project' && (
          <CreateProjectScreen
            onProjectCreated={handleProjectCreated}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'assessment-intro' && activeProject && (
          <AssessmentIntroScreen
            project={activeProject}
            onBegin={() => handleNavigate('assessment-flow')}
            onLoadDemoAnswers={handlePreFillDemoAnswers}
            hasExistingAnswers={hasExistingAnswers}
          />
        )}

        {currentScreen === 'assessment-flow' && activeProject && (
          <AssessmentFlowScreen
            project={activeProject}
            answers={answers}
            onSaveAnswer={handleSaveAnswer}
            onComplete={handleCompleteAssessment}
            onNavigateToReview={() => handleNavigate('assessment-review')}
            onPreFillDemoAnswers={handlePreFillDemoAnswers}
          />
        )}

        {currentScreen === 'assessment-review' && activeProject && (
          <AssessmentReviewScreen
            project={activeProject}
            answers={answers}
            onEditQuestion={(code) => {
              handleNavigate('assessment-flow');
            }}
            onFinalize={handleCompleteAssessment}
            onBackToFlow={() => handleNavigate('assessment-flow')}
          />
        )}

        {currentScreen === 'results' && assessmentResult && (
          <ResultsDashboardScreen
            result={assessmentResult}
            onNavigateToReport={() => handleNavigate('report')}
            onNavigateToFlow={() => handleNavigate('assessment-flow')}
            onNavigateToNewProject={() => handleNavigate('create-project')}
          />
        )}

        {currentScreen === 'report' && assessmentResult && (
          <ReportViewScreen
            result={assessmentResult}
            onNavigateBack={() => handleNavigate('results')}
          />
        )}

        {currentScreen === 'config' && (
          <MethodologyConfigScreen />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
