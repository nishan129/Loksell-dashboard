"use client";
import React from 'react';

const steps = [
  { id: 1, name: 'Customer' },
  { id: 2, name: 'Order Summary' },
  { id: 3, name: 'Payment' }
];

const StepIndicator = ({ currentStep, setCurrentStep }) => {
  return (
    <div style={styles.container} className='border-b shadow-lg border-green-600'>
      {steps.map((step, index) => (
        <div
          key={step.id}
          style={styles.step}
          onClick={() => setCurrentStep(step.id)}
        >
          <div
            style={{
              ...styles.circle,
              ...(currentStep === step.id ? styles.activeCircle : {})
            }}
          >
            {step.id}
          </div>
          <div style={styles.label}>{step.name}</div>
          {index !== steps.length - 1 && <div style={styles.line}></div>}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: '0 20px'
  },
  circle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '2px solid #bbb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#bbb',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  activeCircle: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
    color: '#fff'
  },
  label: {
    fontSize: '14px',
    color: '#333',
    textAlign: 'center'
  },
  line: {
    height: '2px',
    width: '70px',
    backgroundColor: '#bbb',
    position: 'absolute',
    top: '15px',
    left: '100%',
    marginLeft: '10px'
  }
};

export default StepIndicator;
