import React, { useState } from 'react';
import axios from 'axios';

export const TaskPlanner = () => {
  const [task, setTask] = useState('');
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/plan', { task });
      setPlan(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simplified Traycer</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task description"
        style={{ padding: 8, width: 300 }}
      />
      <button onClick={handlePlan} style={{ padding: 8, marginLeft: 10 }}>
        Generate Plan
      </button>
      {loading && <p>Loading...</p>}
      <ul>
        {plan.map((step) => (
          <li key={step.stepNumber}>
            Step {step.stepNumber}: {step.description}
          </li>
        ))}
      </ul>
    </div>
  );
};
