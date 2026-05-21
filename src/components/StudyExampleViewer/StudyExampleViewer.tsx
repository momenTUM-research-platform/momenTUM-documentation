import React, { useEffect, useMemo, useState } from 'react';
import JsonView from '@uiw/react-json-view';
import useBaseUrl from '@docusaurus/useBaseUrl';

type StudyDocument = {
  _id?: {
    $oid?: string;
  };
  _type?: string;
  properties: {
    _type?: string;
    study_name: string;
    study_id: string;
    created_by?: string;
    instructions?: string;
    post_url?: string;
    empty_msg?: string;
    banner_url?: string;
    support_url?: string;
    support_email?: string;
    cache?: boolean;
    ethics?: string;
    pls?: string;
    conditions?: unknown[];
  };
  modules: StudyModule[];
  timestamp?: {
    $numberLong?: string;
  };
};

type StudyModule = {
  _type?: string;
  id: string;
  name: string;
  condition?: string;
  alerts?: AlertSettings;
  graph?: {
    display?: boolean;
  };
  unlock_after?: unknown[];
  params: {
    _type?: string;
    type: string;
    id?: string;
    submit_text?: string;
    shuffle?: boolean;
    sections?: StudySection[];
  };
};

type AlertSettings = {
  scheduleMode?: string;
  offsetDays?: number;
  offsetTime?: string;
  expectedEnrollmentDate?: string;
  startDateTime?: string;
  until?: string | null;
  title?: string;
  message?: string;
  repeat?: string;
  interval?: number;
  repeatCount?: number;
  random?: boolean;
  randomInterval?: number;
  sticky?: boolean;
  stickyLabel?: string;
  timeout?: boolean;
  timeoutAfter?: number;
  times?: unknown[];
};

type StudySection = {
  _type?: string;
  id?: string;
  name: string;
  shuffle?: boolean;
  questions?: StudyQuestion[];
};

type StudyQuestion = {
  _type?: string;
  type: string;
  id: string;
  text: string;
  required?: boolean;
  rand_group?: string;
  hide_id?: string;
  hide_value?: string;
  hide_if?: boolean;
  [key: string]: unknown;
};

type Props = {
  studyPath: string;
};

function formatTimestamp(timestamp?: { $numberLong?: string }) {
  if (!timestamp?.$numberLong) return 'Unknown';

  const value = Number(timestamp.$numberLong);
  if (Number.isNaN(value)) return timestamp.$numberLong;

  return new Date(value).toLocaleString();
}

function getQuestionTypeCounts(study: StudyDocument) {
  const counts: Record<string, number> = {};

  for (const module of study.modules ?? []) {
    for (const section of module.params?.sections ?? []) {
      for (const question of section.questions ?? []) {
        counts[question.type] = (counts[question.type] ?? 0) + 1;
      }
    }
  }

  return counts;
}

function getTotalSections(study: StudyDocument) {
  return study.modules.reduce(
    (total, module) => total + (module.params?.sections?.length ?? 0),
    0,
  );
}

function getTotalQuestions(study: StudyDocument) {
  return study.modules.reduce((moduleTotal, module) => {
    return (
      moduleTotal +
      (module.params.sections ?? []).reduce(
        (sectionTotal, section) => sectionTotal + (section.questions?.length ?? 0),
        0,
      )
    );
  }, 0);
}

function getAlertSummary(alerts?: AlertSettings) {
  if (!alerts) return 'No alert configuration';

  if (alerts.scheduleMode === 'relative') {
    return `Relative schedule: ${alerts.offsetDays ?? 0} day(s) after enrollment at ${
      alerts.offsetTime ?? 'unknown time'
    }`;
  }

  if (alerts.scheduleMode === 'absolute') {
    return `Absolute schedule: starts ${alerts.startDateTime ?? 'unknown start time'}`;
  }

  return 'Schedule mode not specified';
}

export default function StudyExampleViewer({ studyPath }: Props) {
  const [study, setStudy] = useState<StudyDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'flow' | 'json'>('overview');
  const [error, setError] = useState<string | null>(null);
  const resolvedStudyPath = useBaseUrl(studyPath);

  useEffect(() => {
    fetch(resolvedStudyPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${studyPath}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudy(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [resolvedStudyPath]);

  const questionTypeCounts = useMemo(() => {
    if (!study) return {};
    return getQuestionTypeCounts(study);
  }, [study]);

  if (error) {
    return (
      <div className="study-card-error">
        <strong>Could not load study example.</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (!study) {
    return <p>Loading study example...</p>;
  }

  return (
    <div className="study-viewer">
      <div className="study-hero">
        <div>
          <p className="study-eyebrow">Study example</p>
          <h2>{study.properties.study_name}</h2>
          <p>{study.properties.instructions}</p>
        </div>

        {study.properties.banner_url && (
          <img
            className="study-logo"
            src={study.properties.banner_url}
            alt={`${study.properties.study_name} logo`}
          />
        )}
      </div>

      <div className="study-grid">
        <div className="study-stat">
          <span>Study ID</span>
          <strong>{study.properties.study_id}</strong>
        </div>
        <div className="study-stat">
          <span>Modules</span>
          <strong>{study.modules.length}</strong>
        </div>
        <div className="study-stat">
          <span>Sections</span>
          <strong>{getTotalSections(study)}</strong>
        </div>
        <div className="study-stat">
          <span>Questions</span>
          <strong>{getTotalQuestions(study)}</strong>
        </div>
      </div>

      <div className="study-tabs">
        <button
          type="button"
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          type="button"
          className={activeTab === 'flow' ? 'active' : ''}
          onClick={() => setActiveTab('flow')}
        >
          Study flow
        </button>
        <button
          type="button"
          className={activeTab === 'json' ? 'active' : ''}
          onClick={() => setActiveTab('json')}
        >
          Raw JSON
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="study-section">
          <h3>Metadata</h3>

          <div className="study-list">
            <div>
              <span>Created by</span>
              <strong>{study.properties.created_by ?? 'Unknown'}</strong>
            </div>
            <div>
              <span>Document type</span>
              <strong>{study._type ?? 'study'}</strong>
            </div>
            <div>
              <span>Created / updated</span>
              <strong>{formatTimestamp(study.timestamp)}</strong>
            </div>
            <div>
              <span>Cache enabled</span>
              <strong>{study.properties.cache ? 'Yes' : 'No'}</strong>
            </div>
            <div>
              <span>Support email</span>
              <strong>{study.properties.support_email ?? 'Not specified'}</strong>
            </div>
            <div>
              <span>Conditions</span>
              <strong>
                {study.properties.conditions && study.properties.conditions.length > 0
                  ? study.properties.conditions.join(', ')
                  : 'No conditions'}
              </strong>
            </div>
          </div>

          <h3>Question types</h3>

          <div className="question-type-grid">
            {Object.entries(questionTypeCounts).map(([type, count]) => (
              <div key={type} className="question-type-card">
                <span>{type}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'flow' && (
        <div className="study-section">
          {study.modules.map((module, moduleIndex) => (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <div>
                  <p className="study-eyebrow">Module {moduleIndex + 1}</p>
                  <h3>{module.name}</h3>
                </div>
                <span className="module-pill">{module.params.type}</span>
              </div>

              <div className="alert-box">
                <strong>{module.alerts?.title ?? 'Alert configuration'}</strong>
                {module.alerts?.message && <p>{module.alerts.message}</p>}
                <small>{getAlertSummary(module.alerts)}</small>
              </div>

              {(module.params.sections ?? []).map((section, sectionIndex) => (
                <div key={section.id ?? section.name} className="section-card">
                  <p className="study-eyebrow">Section {sectionIndex + 1}</p>
                  <h4>{section.name}</h4>

                  <div className="question-list">
                    {(section.questions ?? []).map((question, questionIndex) => (
                      <div key={question.id} className="question-card">
                        <div>
                          <span className="question-number">{questionIndex + 1}</span>
                          <strong>{question.text}</strong>
                        </div>
                        <span className="question-pill">{question.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'json' && (
        <div className="study-section">
          <JsonView value={study} collapsed={2} displayDataTypes={false} />
        </div>
      )}
    </div>
  );
}