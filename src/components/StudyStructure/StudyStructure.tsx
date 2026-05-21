import React from 'react';

const blocks = [
  {
    title: 'Study properties',
    path: 'properties',
    description:
      'Stores study-level metadata such as study name, study ID, creator, instructions, support information, banner image, conditions, cache setting, ethics text, and PLS link.',
    required: [
      'study_name',
      'study_id',
      'created_by',
      'post_url',
      'empty_msg',
      'banner_url',
      'conditions',
      'cache',
    ],
  },
  {
    title: 'Modules',
    path: 'modules[]',
    description:
      'Modules define the individual survey, intervention, or PVT tasks delivered to participants. Each module contains scheduling, dependency, graph, and parameter settings.',
    required: ['id', 'name', 'condition', 'alerts', 'graph', 'unlock_after', 'params'],
  },
  {
    title: 'Survey params',
    path: 'modules[].params',
    description:
      'Survey parameters define sections, questions, submit button text, section shuffling, and the module type.',
    required: ['sections', 'submit_text', 'shuffle', 'type'],
  },
  {
    title: 'Sections',
    path: 'modules[].params.sections[]',
    description:
      'Sections group questions inside a survey module. Each section has a displayed name, a shuffle setting, and a question list.',
    required: ['name', 'shuffle', 'questions'],
  },
  {
    title: 'Questions',
    path: 'modules[].params.sections[].questions[]',
    description:
      'Questions define the participant-facing inputs. The available types include instruction, text, datetime, multi-choice, slider, media, yes/no, and photo.',
    required: ['id', 'type', 'text', 'required'],
  },
];

export default function StudyStructure() {
  return (
    <div className="schema-map">
      {blocks.map((block, index) => (
        <div key={block.path} className="schema-map-card">
          <div className="schema-map-number">{index + 1}</div>
          <div>
            <p className="schema-path">{block.path}</p>
            <h3>{block.title}</h3>
            <p>{block.description}</p>

            <div className="field-chip-list">
              {block.required.map((field) => (
                <span key={field} className="field-chip">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}