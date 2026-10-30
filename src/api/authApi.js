export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '230408038@st.biruni.edu.tr' && password === 'demo123456') {
        resolve({ username });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};