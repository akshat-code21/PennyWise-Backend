const express = require("express");
const app = express();
const { authRouter } = express();
const { expenseRouter } = express();
const { insightsRouter } = express();
app.use(express.json())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/expenses',expenseRouter)
app.use('/api/v1/insights',insightsRouter);
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});
