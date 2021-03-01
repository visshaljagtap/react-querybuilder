import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QueryBuilder from '../QueryBuilder';
import RuleInputs from './RuleInputs';
import RuleInfo from './RuleInfo';
import Platforms from './Platforms';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Rule Information', 'Platform Seletion', 'Rule Inputs', 'Conditions And Actions'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return <div style={{ minHeight: "60vh" }}><RuleInfo /></div>
      case 1:
        return <div style={{ minHeight: "60vh" }}><Platforms /></div>
      case 2:
        return <div style={{ minHeight: "60vh" }}><RuleInputs /></div>
      case 3:
        return <QueryBuilder />;
      default:
        return "Unknown stepIndex";
    
  }
}

export default function CreateRule() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {

    if(completedSteps() + 1 === totalSteps()){
        //TODO: Form Submission
     }
     else {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            steps.findIndex((step, i) => !completed.has(i))
          : activeStep + 1;
  
      setActiveStep(newActiveStep);
      const newCompleted = new Set(completed);
      newCompleted.add(activeStep);
      setCompleted(newCompleted);
     }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

//   const handleComplete = () => {
//     const newCompleted = new Set(completed);
//     newCompleted.add(activeStep);
//     setCompleted(newCompleted);

//     /**
//      * Sigh... it would be much nicer to replace the following if conditional with
//      * `if (!this.allStepsComplete())` however state is not set when we do this,
//      * thus we have to resort to not being very DRY.
//      */
//     if (completed.size !== totalSteps()) {
//       handleNext();
//     }
//   };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            {/* <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div style={{margin: '0 auto', width: '80%'}}>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div style={{textAlign: 'center'}}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>

              {/* {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
