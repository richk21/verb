import { Step, StepLabel, Stepper } from '@mui/material';
import { ReportStatus } from '../../app/interface/report';

const STEPS: { key: ReportStatus; label: string }[] = [
  { key: 'draft', label: 'Draft' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'published', label: 'Published' },
];
interface IReviewStatusStepperProps {
  status: ReportStatus;
}

export const ReviewStatusStepper = ({ status }: IReviewStatusStepperProps) => {
  const activeIndex = STEPS.findIndex((s) => s.key === status);
  return (
    <Stepper activeStep={activeIndex} alternativeLabel sx={{ mb: 3 }}>
      {STEPS.map((step) => (
        <Step key={step.key}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
