import React, { useState } from 'react';
import JsonView from '@uiw/react-json-view';

const questionTypes = [
  {
    type: 'instruction',
    title: 'Instruction',
    description: 'Displays informational text to the participant. It does not require a participant input.',
    required: ['id', 'type', 'text', 'required'],
    example: {
      type: 'instruction',
      id: 'intro_text',
      text: 'Welcome to the study. Please answer the following questions.',
      required: true,
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'text',
    title: 'Text input',
    description: 'Collects a short, long, or numeric free-text response.',
    required: ['id', 'type', 'text', 'required', 'subtype'],
    example: {
      type: 'text',
      id: 'sleep_notes',
      text: 'How did you sleep?',
      required: true,
      subtype: 'short',
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'datetime',
    title: 'Date/time input',
    description: 'Collects a date, time, or combined datetime value.',
    required: ['id', 'type', 'text', 'required', 'subtype'],
    example: {
      type: 'datetime',
      id: 'bedtime',
      text: 'What time did you go to bed?',
      required: true,
      subtype: 'datetime',
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'multi',
    title: 'Multiple choice',
    description: 'Displays a list of options as radio buttons or checkboxes. Options can also be shuffled.',
    required: ['id', 'type', 'text', 'required', 'radio', 'modal', 'shuffle', 'options'],
    example: {
      type: 'multi',
      id: 'mood_choice',
      text: 'How do you feel right now?',
      required: true,
      radio: true,
      modal: false,
      options: ['Good', 'Okay', 'Bad'],
      shuffle: false,
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'slider',
    title: 'Slider',
    description: 'Collects a numeric response between a minimum and maximum value.',
    required: ['id', 'type', 'text', 'required', 'min', 'max', 'hint_left', 'hint_right'],
    example: {
      type: 'slider',
      id: 'energy_level',
      text: 'How energetic do you feel?',
      required: true,
      min: 0,
      max: 10,
      hint_left: 'Not energetic',
      hint_right: 'Very energetic',
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'media',
    title: 'Media',
    description: 'Displays video, audio, or image content from a direct URL.',
    required: ['id', 'type', 'text', 'required', 'subtype', 'src'],
    example: {
      type: 'media',
      id: 'study_image',
      text: 'Please look at this image.',
      required: true,
      subtype: 'image',
      src: 'https://example.com/image.png',
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'yesno',
    title: 'Yes / No',
    description: 'Collects a binary yes/no response with configurable labels.',
    required: ['id', 'type', 'text', 'required', 'yes_text', 'no_text'],
    example: {
      type: 'yesno',
      id: 'took_medication',
      text: 'Did you take your medication today?',
      required: true,
      yes_text: 'Yes',
      no_text: 'No',
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
  {
    type: 'photo',
    title: 'Photo',
    description: 'Allows the participant to take or upload a photo response.',
    required: ['id', 'type', 'text', 'required'],
    example: {
      type: 'photo',
      id: 'meal_photo',
      text: 'Take a photo of your meal.',
      required: true,
      rand_group: '',
      hide_id: 'none',
      hide_value: '',
      hide_if: false,
    },
  },
];

export default function QuestionTypeExplorer() {
  const [activeType, setActiveType] = useState(questionTypes[0]);

  return (
    <div className="question-type-explorer">
      <div className="question-type-sidebar">
        {questionTypes.map((questionType) => (
          <button
            key={questionType.type}
            className={activeType.type === questionType.type ? 'active' : ''}
            onClick={() => setActiveType(questionType)}
          >
            {questionType.title}
          </button>
        ))}
      </div>

      <div className="question-type-detail">
        <p className="schema-path">type: {activeType.type}</p>
        <h3>{activeType.title}</h3>
        <p>{activeType.description}</p>

        <h4>Required fields</h4>
        <div className="field-chip-list">
          {activeType.required.map((field) => (
            <span key={field} className="field-chip">
              {field}
            </span>
          ))}
        </div>

        <h4>Example JSON</h4>
        <JsonView value={activeType.example} collapsed={1} displayDataTypes={false} />
      </div>
    </div>
  );
}