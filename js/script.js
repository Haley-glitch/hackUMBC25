// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    setupTabs();
    
    // Form navigation
    setupFormNavigation();
    
    // Financial plan generation
    setupPlanGeneration();
    
    // Knowledge base functionality
    setupKnowledgeBase();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup loan form functionality
    setupLoanForm();
});

// Tab switching functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Form navigation (next/previous buttons)
function setupFormNavigation() {
    const nextButtons = document.querySelectorAll('.next-tab');
    const prevButtons = document.querySelectorAll('.prev-tab');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nextTabId = button.getAttribute('data-next');
            switchToTab(nextTabId);
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevTabId = button.getAttribute('data-prev');
            switchToTab(prevTabId);
        });
    });
}

// Helper function to switch tabs
function switchToTab(tabId) {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to target button and pane
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Financial plan generation
function setupPlanGeneration() {
    const generateButton = document.querySelector('.generate-plan');
    const downloadButton = document.getElementById('download-plan');
    const shareButton = document.getElementById('share-plan');
    
    generateButton.addEventListener('click', () => {
        // Show loading state
        document.querySelector('.plan-loading').style.display = 'block';
        document.querySelector('.plan-content').style.display = 'none';
        
        // Switch to generated plan tab
        switchToTab('generated-plan');
        
        // Simulate plan generation (in a real app, this would be an API call)
        setTimeout(() => {
            generateFinancialPlan();
            
            // Hide loading, show content
            document.querySelector('.plan-loading').style.display = 'none';
            document.querySelector('.plan-content').style.display = 'block';
        }, 2000);
    });
    
    // Download plan functionality
    downloadButton.addEventListener('click', () => {
        alert('Your financial plan is being prepared for download.');
        // In a real app, this would generate a PDF or other document
    });
    
    // Share plan functionality
    shareButton.addEventListener('click', () => {
        alert('Share options: Email, PDF, or Link');
        // In a real app, this would open sharing options
    });
}

// Generate the financial plan based on user inputs
function generateFinancialPlan() {
    // Get form data
    const financialData = getFinancialData();
    const goalData = getGoalData();
    
    // Calculate financial metrics
    const metrics = calculateFinancialMetrics(financialData);
    
    // Generate recommendations based on goals and current situation
    const recommendations = generateRecommendations(financialData, goalData, metrics);
    
    // Create investment allocation based on risk tolerance
    const allocation = createInvestmentAllocation(goalData.riskTolerance);
    
    // Generate loan payoff vs investment projections
    const projections = generateProjections(financialData, goalData, metrics);
    
    // Render the plan
    renderFinancialPlan(metrics, recommendations, allocation, projections);
}

// Get financial history data from form
function getFinancialData() {
    // Get loan data from dynamic loan form
    const loans = [];
    const loanItems = document.querySelectorAll('.loan-item');
    
    loanItems.forEach((item, index) => {
        const loanNumber = index + 1;
        const loanType = document.getElementById(`loan-type-${loanNumber}`)?.value || 'other';
        const balance = parseFloat(document.getElementById(`loan-balance-${loanNumber}`)?.value) || 0;
        const apr = parseFloat(document.getElementById(`loan-apr-${loanNumber}`)?.value) || 0;
        const payment = parseFloat(document.getElementById(`loan-payment-${loanNumber}`)?.value) || 0;
        const term = parseInt(document.getElementById(`loan-term-${loanNumber}`)?.value) || 0;
        
        if (balance > 0) {
            loans.push({
                type: loanType,
                balance: balance,
                apr: apr / 100, // Convert percentage to decimal
                payment: payment,
                remainingTerm: term
            });
        }
    });
    
    // Calculate total loan balance
    const totalLoans = loans.reduce((sum, loan) => sum + loan.balance, 0);
    
    return {
        monthlyIncome: parseFloat(document.getElementById('monthly-income').value) || 5000,
        additionalIncome: parseFloat(document.getElementById('additional-income').value) || 1000,
        housing: parseFloat(document.getElementById('housing').value) || 1500,
        utilities: parseFloat(document.getElementById('utilities').value) || 300,
        food: parseFloat(document.getElementById('food').value) || 600,
        transportation: parseFloat(document.getElementById('transportation').value) || 400,
        entertainment: parseFloat(document.getElementById('entertainment').value) || 300,
        otherExpenses: parseFloat(document.getElementById('other-expenses').value) || 200,
        savings: parseFloat(document.getElementById('savings').value) || 10000,
        investments: parseFloat(document.getElementById('investments').value) || 20000,
        property: parseFloat(document.getElementById('property').value) || 250000,
        loans: loans,
        totalLoans: totalLoans
    };
}

// Get financial goals data from form
function getGoalData() {
    return {
        emergencyFund: parseFloat(document.getElementById('emergency-fund').value) || 15000,
        debtReduction: parseFloat(document.getElementById('debt-reduction').value) || 10000,
        vacation: parseFloat(document.getElementById('vacation').value) || 5000,
        homePurchase: parseFloat(document.getElementById('home-purchase').value) || 50000,
        education: parseFloat(document.getElementById('education').value) || 30000,
        vehicle: parseFloat(document.getElementById('vehicle').value) || 25000,
        retirement: parseFloat(document.getElementById('retirement').value) || 1000000,
        childrenEducation: parseFloat(document.getElementById('children-education').value) || 100000,
        legacy: parseFloat(document.getElementById('legacy').value) || 500000,
        riskTolerance: document.getElementById('risk-tolerance').value
    };
}

// Calculate financial metrics based on input data
function calculateFinancialMetrics(data) {
    const totalMonthlyIncome = data.monthlyIncome + data.additionalIncome;
    const totalMonthlyExpenses = data.housing + data.utilities + data.food + 
                                data.transportation + data.entertainment + data.otherExpenses;
    const monthlySavingsPotential = totalMonthlyIncome - totalMonthlyExpenses;
    const annualSavingsPotential = monthlySavingsPotential * 12;
    
    const totalAssets = data.savings + data.investments + data.property;
    const totalLiabilities = data.loans + data.creditCard + data.mortgage;
    const netWorth = totalAssets - totalLiabilities;
    
    const debtToIncomeRatio = ((data.loans + data.creditCard + data.mortgage) / 12) / totalMonthlyIncome;
    const emergencyFundMonths = data.savings / totalMonthlyExpenses;
    
    return {
        totalMonthlyIncome,
        totalMonthlyExpenses,
        monthlySavingsPotential,
        annualSavingsPotential,
        totalAssets,
        totalLiabilities,
        netWorth,
        debtToIncomeRatio,
        emergencyFundMonths
    };
}

// Generate personalized recommendations
function generateRecommendations(financialData, goalData, metrics) {
    const recommendations = [];
    
    // Emergency Fund Recommendation
    if (metrics.emergencyFundMonths < 6) {
        const emergencyFundNeeded = goalData.emergencyFund - financialData.savings;
        const monthsToGoal = emergencyFundNeeded / metrics.monthlySavingsPotential;
        
        recommendations.push({
            title: "Build Your Emergency Fund",
            description: `Your current emergency fund covers ${metrics.emergencyFundMonths.toFixed(1)} months of expenses. Aim for 6 months of coverage by saving $${emergencyFundNeeded.toFixed(2)} more. At your current savings rate, you can reach this goal in ${monthsToGoal.toFixed(1)} months.`,
            priority: "High"
        });
    }
    
    // Debt Reduction Recommendation
    if (metrics.debtToIncomeRatio > 0.36) {
        recommendations.push({
            title: "Reduce High-Interest Debt",
            description: `Your debt-to-income ratio is ${(metrics.debtToIncomeRatio * 100).toFixed(1)}%, which is above the recommended 36%. Focus on paying down high-interest debt like credit cards first, then personal loans.`,
            priority: "High"
        });
    }
    
    // Retirement Savings Recommendation
    const retirementSavingsRate = (financialData.investments / metrics.totalMonthlyIncome) * 100;
    if (retirementSavingsRate < 15) {
        recommendations.push({
            title: "Increase Retirement Contributions",
            description: `You're currently saving approximately ${retirementSavingsRate.toFixed(1)}% for retirement. Consider increasing this to at least 15% of your income to meet your retirement goal of $${goalData.retirement.toLocaleString()}.`,
            priority: "Medium"
        });
    }
    
    // Additional Recommendations
    recommendations.push({
        title: "Diversify Your Investments",
        description: `Based on your ${goalData.riskTolerance} risk tolerance, consider diversifying your investment portfolio according to the allocation chart below.`,
        priority: "Medium"
    });
    
    recommendations.push({
        title: "Tax Optimization Strategy",
        description: "Maximize tax-advantaged accounts like 401(k)s and IRAs before investing in taxable accounts. Consider tax-loss harvesting for taxable investments.",
        priority: "Medium"
    });
    
    // Add more personalized recommendations based on goals
    if (goalData.homePurchase > 0) {
        const homeDownPaymentMonths = goalData.homePurchase / metrics.monthlySavingsPotential;
        recommendations.push({
            title: "Home Purchase Savings Plan",
            description: `To save $${goalData.homePurchase.toLocaleString()} for your home down payment, allocate a portion of your monthly savings. At your current rate, this would take approximately ${homeDownPaymentMonths.toFixed(1)} months.`,
            priority: "Medium"
        });
    }
    
    return recommendations;
}

// Create investment allocation based on risk tolerance
function createInvestmentAllocation(riskTolerance) {
    let allocation = {};
    
    switch(riskTolerance) {
        case 'conservative':
            allocation = {
                stocks: 30,
                bonds: 50,
                cash: 15,
                alternatives: 5
            };
            break;
        case 'moderate':
            allocation = {
                stocks: 60,
                bonds: 30,
                cash: 5,
                alternatives: 5
            };
            break;
        case 'aggressive':
            allocation = {
                stocks: 80,
                bonds: 10,
                cash: 5,
                alternatives: 5
            };
            break;
        default:
            allocation = {
                stocks: 60,
                bonds: 30,
                cash: 5,
                alternatives: 5
            };
    }
    
    return allocation;
}

// Generate loan payoff vs investment projections
function generateProjections(financialData, goalData, metrics) {
    // Calculate extra payment available
    const extraPayment = metrics.monthlySavingsPotential;
    
    // Get highest interest rate loan
    let highestRateLoan = { apr: 0 };
    if (financialData.loans && financialData.loans.length > 0) {
        highestRateLoan = financialData.loans.reduce((max, loan) => 
            loan.apr > max.apr ? loan : max, { apr: 0 });
    }
    
    // Investment return rate (expected return minus inflation adjustment)
    const investmentRate = goalData.riskTolerance === 'aggressive' ? 0.07 : 
                          goalData.riskTolerance === 'moderate' ? 0.05 : 0.03;
    
    // Determine if paying debt or investing is better based on interest rates
    const shouldPayDebt = highestRateLoan.apr > investmentRate;
    
    // Generate 5-year projections (60 months)
    const projectionMonths = 60;
    const payDebtProjection = [];
    const investProjection = [];
    const splitProjection = [];
    
    // Initial values
    let remainingDebt = financialData.totalLoans;
    let investmentValue = financialData.investments;
    let splitDebt = remainingDebt;
    let splitInvestment = investmentValue;
    
    // Monthly rates
    const debtRate = highestRateLoan.apr / 12;
    const investRate = investmentRate / 12;
    
    // Generate monthly projections
    for (let month = 0; month <= projectionMonths; month++) {
        // Pay debt strategy
        if (remainingDebt > 0) {
            // Apply extra payment to debt
            remainingDebt = Math.max(0, remainingDebt * (1 + debtRate) - extraPayment);
            // After debt is paid off, start investing
            if (remainingDebt === 0) {
                investmentValue *= (1 + investRate);
            }
        } else {
            // Debt is paid off, put everything into investments
            investmentValue *= (1 + investRate);
            investmentValue += extraPayment;
        }
        
        // Invest strategy
        // Put all extra money into investments
        let currentInvestValue = month === 0 ? investmentValue : 
            investProjection[month - 1].investmentValue * (1 + investRate) + extraPayment;
        
        // Split strategy (50/50)
        if (splitDebt > 0) {
            // Apply half of extra payment to debt
            splitDebt = Math.max(0, splitDebt * (1 + debtRate) - (extraPayment * 0.5));
            // Put other half into investments
            splitInvestment *= (1 + investRate);
            splitInvestment += (extraPayment * 0.5);
        } else {
            // Debt is paid off, put everything into investments
            splitInvestment *= (1 + investRate);
            splitInvestment += extraPayment;
        }
        
        // Store monthly values
        payDebtProjection.push({
            month: month,
            debt: remainingDebt,
            investmentValue: investmentValue
        });
        
        investProjection.push({
            month: month,
            debt: month === 0 ? remainingDebt : investProjection[month - 1].debt * (1 + debtRate),
            investmentValue: currentInvestValue
        });
        
        splitProjection.push({
            month: month,
            debt: splitDebt,
            investmentValue: splitInvestment
        });
    }
    
    // Calculate breakeven point (when invest strategy overtakes pay debt strategy)
    let breakevenMonth = null;
    for (let i = 0; i < projectionMonths; i++) {
        if (investProjection[i].investmentValue - investProjection[i].debt > 
            payDebtProjection[i].investmentValue - payDebtProjection[i].debt) {
            breakevenMonth = i;
            break;
        }
    }
    
    return {
        payDebt: payDebtProjection,
        invest: investProjection,
        split: splitProjection,
        breakevenMonth: breakevenMonth,
        recommendedStrategy: shouldPayDebt ? 'pay_debt' : 
                            breakevenMonth && breakevenMonth < 24 ? 'invest' : 'split'
    };
}

// Render the financial plan to the UI with enhanced visualizations
function renderFinancialPlan(metrics, recommendations, allocation, projections) {
    // Update summary metrics
    document.getElementById('summary-income').textContent = '$' + metrics.totalMonthlyIncome.toLocaleString();
    document.getElementById('summary-expenses').textContent = '$' + metrics.totalMonthlyExpenses.toLocaleString();
    document.getElementById('summary-savings').textContent = '$' + metrics.monthlySavingsPotential.toLocaleString();
    document.getElementById('summary-dti').textContent = (metrics.debtToIncomeRatio * 100).toFixed(1) + '%';
    document.getElementById('summary-emergency').textContent = metrics.emergencyFundMonths.toFixed(1) + ' months';
    document.getElementById('summary-networth').textContent = '$' + metrics.netWorth.toLocaleString();
    
    // Render expense breakdown chart
    renderExpenseChart(metrics);
    
    // Render strategy comparison chart
    renderStrategyChart(projections);
    
    // Render strategy recommendation
    renderStrategyRecommendation(projections, metrics);
    
    // Render action plan timeline
    renderActionPlan(metrics, projections);
}

// Render expense breakdown pie chart
function renderExpenseChart(metrics) {
    const expenseChartContainer = document.getElementById('expense-chart');
    
    // Create expense data for chart
    const expenseData = [
        { category: 'Housing', value: metrics.housing || 0, color: '#4338ca' },
        { category: 'Utilities', value: metrics.utilities || 0, color: '#6366f1' },
        { category: 'Food', value: metrics.food || 0, color: '#8b5cf6' },
        { category: 'Transportation', value: metrics.transportation || 0, color: '#a855f7' },
        { category: 'Entertainment', value: metrics.entertainment || 0, color: '#d946ef' },
        { category: 'Other', value: metrics.otherExpenses || 0, color: '#ec4899' }
    ];
    
    // Filter out zero values
    const filteredExpenses = expenseData.filter(item => item.value > 0);
    
    // Calculate total for percentages
    const total = filteredExpenses.reduce((sum, item) => sum + item.value, 0);
    
    // Create SVG for pie chart
    let svg = `
        <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(150, 150)">
    `;
    
    // Create pie segments
    let startAngle = 0;
    filteredExpenses.forEach(expense => {
        const percentage = expense.value / total;
        const endAngle = startAngle + percentage * 2 * Math.PI;
        
        // Calculate path for pie segment
        const x1 = Math.cos(startAngle) * 100;
        const y1 = Math.sin(startAngle) * 100;
        const x2 = Math.cos(endAngle) * 100;
        const y2 = Math.sin(endAngle) * 100;
        
        // Determine if the arc should be drawn as a large arc
        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        
        // Create path
        const path = `
            <path d="M 0 0 L ${x1} ${y1} A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
                  fill="${expense.color}" stroke="white" stroke-width="1">
                <title>${expense.category}: $${expense.value.toLocaleString()} (${(percentage * 100).toFixed(1)}%)</title>
            </path>
        `;
        
        svg += path;
        startAngle = endAngle;
    });
    
    // Close SVG
    svg += `
            </g>
        </svg>
    `;
    
    // Add legend
    let legend = '<div class="chart-legend" style="display: flex; flex-wrap: wrap; justify-content: center; margin-top: 10px;">';
    
    filteredExpenses.forEach(expense => {
        const percentage = expense.value / total;
        legend += `
            <div style="display: flex; align-items: center; margin: 5px 10px;">
                <div style="width: 12px; height: 12px; background-color: ${expense.color}; margin-right: 5px;"></div>
                <span>${expense.category}: ${(percentage * 100).toFixed(1)}%</span>
            </div>
        `;
    });
    
    legend += '</div>';
    
    // Add to container
    expenseChartContainer.innerHTML = svg + legend;
}

// Render strategy comparison chart
function renderStrategyChart(projections) {
    const strategyChartContainer = document.getElementById('strategy-chart');
    
    // Create SVG for line chart
    const width = 600;
    const height = 300;
    const padding = { top: 20, right: 30, bottom: 40, left: 60 };
    
    // Find max values for scaling
    let maxDebt = 0;
    let maxInvestment = 0;
    let maxMonth = 60; // 5 years
    
    // Check all strategies
    ['payDebt', 'invest', 'split'].forEach(strategy => {
        projections[strategy].forEach(point => {
            maxDebt = Math.max(maxDebt, point.debt);
            maxInvestment = Math.max(maxInvestment, point.investmentValue);
        });
    });
    
    // Use the larger of maxDebt or maxInvestment for Y scale
    const maxY = Math.max(maxDebt, maxInvestment) * 1.1; // Add 10% margin
    
    // Scale functions
    const xScale = (month) => padding.left + (month / maxMonth) * (width - padding.left - padding.right);
    const yScale = (value) => height - padding.bottom - (value / maxY) * (height - padding.top - padding.bottom);
    
    // Create SVG
    let svg = `
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    `;
    
    // Add axes
    svg += `
        <!-- X axis -->
        <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#64748b" stroke-width="1" />
        
        <!-- Y axis -->
        <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#64748b" stroke-width="1" />
        
        <!-- X axis labels -->
        <text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="12">Months</text>
        
        <!-- Y axis labels -->
        <text x="15" y="${height / 2}" text-anchor="middle" font-size="12" transform="rotate(-90, 15, ${height / 2})">Amount ($)</text>
    `;
    
    // Add X axis ticks
    for (let month = 0; month <= maxMonth; month += 12) {
        const x = xScale(month);
        svg += `
            <line x1="${x}" y1="${height - padding.bottom}" x2="${x}" y2="${height - padding.bottom + 5}" stroke="#64748b" stroke-width="1" />
            <text x="${x}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="10">${month}</text>
        `;
    }
    
    // Add Y axis ticks
    for (let value = 0; value <= maxY; value += maxY / 5) {
        const y = yScale(value);
        svg += `
            <line x1="${padding.left - 5}" y1="${y}" x2="${padding.left}" y2="${y}" stroke="#64748b" stroke-width="1" />
            <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="10">$${Math.round(value).toLocaleString()}</text>
        `;
    }
    
    // Create line paths for each strategy
    
    // Pay Debt Strategy - Debt Line
    let payDebtDebtPath = `M`;
    projections.payDebt.forEach((point, i) => {
        const x = xScale(point.month);
        const y = yScale(point.debt);
        payDebtDebtPath += `${i === 0 ? '' : ' L'}${x} ${y}`;
    });
    
    // Pay Debt Strategy - Investment Line
    let payDebtInvestPath = `M`;
    projections.payDebt.forEach((point, i) => {
        const x = xScale(point.month);
        const y = yScale(point.investmentValue);
        payDebtInvestPath += `${i === 0 ? '' : ' L'}${x} ${y}`;
    });
    
    // Invest Strategy - Debt Line
    let investDebtPath = `M`;
    projections.invest.forEach((point, i) => {
        const x = xScale(point.month);
        const y = yScale(point.debt);
        investDebtPath += `${i === 0 ? '' : ' L'}${x} ${y}`;
    });
    
    // Invest Strategy - Investment Line
    let investInvestPath = `M`;
    projections.invest.forEach((point, i) => {
        const x = xScale(point.month);
        const y = yScale(point.investmentValue);
        investInvestPath += `${i === 0 ? '' : ' L'}${x} ${y}`;
    });
    
    // Add paths to SVG
    svg += `
        <!-- Pay Debt Strategy -->
        <path d="${payDebtDebtPath}" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" />
        <path d="${payDebtInvestPath}" fill="none" stroke="#10b981" stroke-width="2" />
        
        <!-- Invest Strategy -->
        <path d="${investDebtPath}" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.6" />
        <path d="${investInvestPath}" fill="none" stroke="#10b981" stroke-width="2" opacity="0.6" />
    `;
    
    // Add breakeven point if exists
    if (projections.breakevenMonth) {
        const x = xScale(projections.breakevenMonth);
        svg += `
            <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="#6366f1" stroke-width="1" stroke-dasharray="3,3" />
            <text x="${x}" y="${padding.top + 15}" text-anchor="middle" font-size="10" fill="#6366f1">Breakeven: Month ${projections.breakevenMonth}</text>
        `;
    }
    
    // Add legend
    svg += `
        <rect x="${width - padding.right - 150}" y="${padding.top}" width="150" height="80" fill="white" stroke="#e2e8f0" />
        
        <rect x="${width - padding.right - 140}" y="${padding.top + 15}" width="10" height="2" fill="#ef4444" />
        <text x="${width - padding.right - 125}" y="${padding.top + 20}" font-size="10">Debt Balance</text>
        
        <rect x="${width - padding.right - 140}" y="${padding.top + 35}" width="10" height="2" fill="#10b981" />
        <text x="${width - padding.right - 125}" y="${padding.top + 40}" font-size="10">Investment Value</text>
        
        <rect x="${width - padding.right - 140}" y="${padding.top + 55}" width="10" height="2" fill="none" stroke="#6366f1" stroke-dasharray="3,3" />
        <text x="${width - padding.right - 125}" y="${padding.top + 60}" font-size="10">Breakeven Point</text>
    `;
    
    // Close SVG
    svg += `</svg>`;
    
    // Add to container
    strategyChartContainer.innerHTML = svg;
}

// Render strategy recommendation
function renderStrategyRecommendation(projections, metrics) {
    const recommendationContainer = document.getElementById('strategy-recommendation');
    
    // Determine recommendation based on projections
    const strategy = projections.recommendedStrategy;
    let title, description, className;
    
    if (strategy === 'pay_debt') {
        title = 'Focus on Debt Payoff First';
        description = `Your loan interest rate is higher than expected investment returns. Paying off your debt first will save you $${Math.round(metrics.totalMonthlyExpenses * 0.2 * 12).toLocaleString()} in interest over the next year and provide guaranteed returns equal to your interest rate.`;
        className = 'recommendation-card debt-focus';
    } else if (strategy === 'invest') {
        title = 'Prioritize Investing';
        description = `Your expected investment returns exceed your loan interest rates, and the investment strategy breaks even in just ${projections.breakevenMonth} months. Focusing on investments while making minimum debt payments is likely to build more wealth over time.`;
        className = 'recommendation-card invest-focus';
    } else {
        title = 'Balanced Approach Recommended';
        description = 'With similar rates between your debt and potential investment returns, a balanced approach works best. Split your extra money between debt payments and investments to manage risk while working toward both goals.';
        className = 'recommendation-card balanced-focus';
    }
    
    // Create recommendation card
    recommendationContainer.innerHTML = `
        <div class="${className}">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="recommendation-metrics">
                <div class="metric">
                    <div class="metric-label">5-Year Net Worth (Recommended)</div>
                    <div class="metric-value">$${Math.round(getNetWorthForStrategy(projections, strategy)).toLocaleString()}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Debt-Free Timeline</div>
                    <div class="metric-value">${getDebtFreeMonthsForStrategy(projections, strategy)} months</div>
                </div>
            </div>
        </div>
    `;
    
    // Add some basic styles
    const style = document.createElement('style');
    style.textContent = `
        .recommendation-card {
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .debt-focus {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
        }
        
        .invest-focus {
            background-color: #dcfce7;
            border-left: 4px solid #10b981;
        }
        
        .balanced-focus {
            background-color: #dbeafe;
            border-left: 4px solid #3b82f6;
        }
        
        .recommendation-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .recommendation-metrics .metric {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 0.75rem;
            border-radius: 0.25rem;
        }
        
        .metric-label {
            font-size: 0.75rem;
            color: #64748b;
            margin-bottom: 0.25rem;
        }
        
        .metric-value {
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
        }
    `;
    recommendationContainer.appendChild(style);
}

// Helper function to get net worth for a strategy
function getNetWorthForStrategy(projections, strategy) {
    const strategyMap = {
        'pay_debt': 'payDebt',
        'invest': 'invest',
        'split': 'split'
    };
    
    const data = projections[strategyMap[strategy]];
    if (!data || data.length === 0) return 0;
    
    const lastPoint = data[data.length - 1];
    return lastPoint.investmentValue - lastPoint.debt;
}

// Helper function to get debt-free months for a strategy
function getDebtFreeMonthsForStrategy(projections, strategy) {
    const strategyMap = {
        'pay_debt': 'payDebt',
        'invest': 'invest',
        'split': 'split'
    };
    
    const data = projections[strategyMap[strategy]];
    if (!data || data.length === 0) return 'N/A';
    
    // Find first month where debt is zero
    for (let i = 0; i < data.length; i++) {
        if (data[i].debt <= 0) {
            return i;
        }
    }
    
    return '60+'; // More than 5 years
}

// Render action plan timeline
function renderActionPlan(metrics, projections) {
    const actionPlanContainer = document.getElementById('action-plan');
    
    // Create action steps based on financial situation
    const steps = [];
    
    // Emergency fund step
    if (metrics.emergencyFundMonths < 3) {
        steps.push({
            timeframe: 'Month 1-2',
            title: 'Build Emergency Fund',
            description: `Save $${Math.round(metrics.totalMonthlyExpenses * 3 - metrics.savings).toLocaleString()} to reach 3 months of expenses in your emergency fund.`,
            priority: 'high'
        });
    }
    
    // Debt step based on recommendation
    if (projections.recommendedStrategy === 'pay_debt') {
        steps.push({
            timeframe: 'Month 1-6',
            title: 'Accelerate Debt Payoff',
            description: `Apply $${Math.round(metrics.monthlySavingsPotential).toLocaleString()} extra per month to your highest-interest debt.`,
            priority: 'high'
        });
    } else if (projections.recommendedStrategy === 'invest') {
        steps.push({
            timeframe: 'Month 1-6',
            title: 'Maximize Investments',
            description: `Contribute $${Math.round(metrics.monthlySavingsPotential).toLocaleString()} per month to your investment accounts while making minimum debt payments.`,
            priority: 'high'
        });
    } else {
        steps.push({
            timeframe: 'Month 1-6',
            title: 'Balance Debt and Investments',
            description: `Split your $${Math.round(metrics.monthlySavingsPotential).toLocaleString()} extra monthly cash flow: 50% to debt, 50% to investments.`,
            priority: 'high'
        });
    }
    
    // Retirement step
    steps.push({
        timeframe: 'Month 3-4',
        title: 'Review Retirement Contributions',
        description: 'Ensure you\'re contributing at least 15% of your income to retirement accounts, especially if you have an employer match.',
        priority: 'medium'
    });
    
    // Insurance step
    steps.push({
        timeframe: 'Month 5-6',
        title: 'Review Insurance Coverage',
        description: 'Evaluate your health, life, disability, and property insurance to ensure adequate protection.',
        priority: 'medium'
    });
    
    // Investment allocation step
    steps.push({
        timeframe: 'Month 7-8',
        title: 'Optimize Investment Allocation',
        description: 'Review and adjust your investment portfolio to align with your risk tolerance and goals.',
        priority: 'medium'
    });
    
    // Tax optimization step
    steps.push({
        timeframe: 'Month 9-10',
        title: 'Implement Tax Optimization',
        description: 'Maximize tax-advantaged accounts and consider tax-efficient investment strategies.',
        priority: 'medium'
    });
    
    // Automation step
    steps.push({
        timeframe: 'Month 11-12',
        title: 'Automate Your Financial Plan',
        description: 'Set up automatic transfers for savings, investments, and debt payments to stay consistent.',
        priority: 'medium'
    });
    
    // Create timeline HTML
    let timelineHTML = '<div class="action-timeline">';
    
    steps.forEach((step, index) => {
        timelineHTML += `
            <div class="timeline-item ${step.priority}-priority">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-timeframe">${step.timeframe}</div>
                    <h4 class="timeline-title">${step.title}</h4>
                    <p class="timeline-description">${step.description}</p>
                </div>
            </div>
        `;
    });
    
    timelineHTML += '</div>';
    
    // Add timeline to container
    actionPlanContainer.innerHTML = timelineHTML;
    
    // Add timeline styles
    const style = document.createElement('style');
    style.textContent = `
        .action-timeline {
            position: relative;
            padding-left: 2rem;
        }
        
        .action-timeline::before {
            content: '';
            position: absolute;
            left: 0.75rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #e2e8f0;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 1.5rem;
        }
        
        .timeline-marker {
            position: absolute;
            left: -2rem;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: #64748b;
            border: 2px solid white;
            z-index: 1;
        }
        
        .high-priority .timeline-marker {
            background-color: #ef4444;
        }
        
        .medium-priority .timeline-marker {
            background-color: #f59e0b;
        }
        
        .timeline-content {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        
        .timeline-timeframe {
            font-size: 0.75rem;
            font-weight: 600;
            color: #64748b;
            margin-bottom: 0.25rem;
        }
        
        .timeline-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }
        
        .timeline-description {
            font-size: 0.875rem;
            color: #475569;
        }
        
        .high-priority .timeline-content {
            border-left: 3px solid #ef4444;
        }
        
        .medium-priority .timeline-content {
            border-left: 3px solid #f59e0b;
        }
    `;
    actionPlanContainer.appendChild(style);
}

// Knowledge base functionality
function setupKnowledgeBase() {
    const categories = document.querySelectorAll('.category');
    const knowledgeDisplay = document.getElementById('knowledge-display');
    
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryType = category.getAttribute('data-category');
            displayKnowledgeContent(categoryType, knowledgeDisplay);
        });
    });
}

// Display knowledge content based on selected category
function displayKnowledgeContent(category, display) {
    // Investment knowledge content
    const knowledgeContent = {
        'stocks': {
            title: 'Stocks',
            content: `
                <h3>Understanding Stocks</h3>
                <p>Stocks represent ownership in a company. When you buy a stock, you're purchasing a small piece of that company, called a share.</p>
                
                <h4>Types of Stocks</h4>
                <ul>
                    <li><strong>Common Stocks:</strong> Represent ownership in a company and may pay dividends.</li>
                    <li><strong>Preferred Stocks:</strong> Typically pay fixed dividends and have priority over common stocks.</li>
                    <li><strong>Growth Stocks:</strong> Companies expected to grow at an above-average rate.</li>
                    <li><strong>Value Stocks:</strong> Companies that appear to be undervalued in the market.</li>
                    <li><strong>Dividend Stocks:</strong> Companies that pay regular dividends to shareholders.</li>
                </ul>
                
                <h4>Benefits of Investing in Stocks</h4>
                <ul>
                    <li>Potential for high returns over the long term</li>
                    <li>Opportunity for dividend income</li>
                    <li>Protection against inflation</li>
                    <li>Liquidity - easily bought and sold</li>
                </ul>
                
                <h4>Risks of Stock Investing</h4>
                <ul>
                    <li>Market volatility and price fluctuations</li>
                    <li>Company-specific risks</li>
                    <li>Economic and industry risks</li>
                </ul>
                
                <h4>Getting Started with Stocks</h4>
                <p>Before investing in individual stocks, consider your investment goals, risk tolerance, and time horizon. Many financial advisors recommend starting with index funds or ETFs before moving to individual stock picking.</p>
            `
        },
        'bonds': {
            title: 'Bonds',
            content: `
                <h3>Understanding Bonds</h3>
                <p>Bonds are debt securities where you lend money to an entity (government, municipality, or corporation) for a defined period at a fixed interest rate.</p>
                
                <h4>Types of Bonds</h4>
                <ul>
                    <li><strong>Government Bonds:</strong> Issued by national governments, considered very safe.</li>
                    <li><strong>Municipal Bonds:</strong> Issued by states, cities, or counties, often tax-exempt.</li>
                    <li><strong>Corporate Bonds:</strong> Issued by companies, higher risk but potentially higher returns.</li>
                    <li><strong>Treasury Bonds:</strong> Long-term government securities with maturities of 10+ years.</li>
                    <li><strong>Treasury Notes:</strong> Medium-term government securities with 2-10 year maturities.</li>
                </ul>
                
                <h4>Benefits of Investing in Bonds</h4>
                <ul>
                    <li>Regular, predictable income</li>
                    <li>Generally lower risk than stocks</li>
                    <li>Portfolio diversification</li>
                    <li>Capital preservation</li>
                </ul>
                
                <h4>Risks of Bond Investing</h4>
                <ul>
                    <li>Interest rate risk - bond prices fall when interest rates rise</li>
                    <li>Inflation risk - fixed payments may lose purchasing power</li>
                    <li>Credit/default risk - issuer may fail to make payments</li>
                </ul>
                
                <h4>Bond Ratings</h4>
                <p>Bonds are rated by agencies like Standard & Poor's, Moody's, and Fitch to indicate credit quality:</p>
                <ul>
                    <li>AAA, AA: High quality, low risk</li>
                    <li>A, BBB: Medium quality</li>
                    <li>BB, B, CCC, CC, C: Lower quality (junk bonds)</li>
                    <li>D: In default</li>
                </ul>
            `
        },
        'real-estate': {
            title: 'Real Estate',
            content: `
                <h3>Real Estate Investing</h3>
                <p>Real estate investing involves purchasing, owning, managing, renting, or selling property for profit.</p>
                
                <h4>Types of Real Estate Investments</h4>
                <ul>
                    <li><strong>Residential:</strong> Single-family homes, apartments, condos, townhouses</li>
                    <li><strong>Commercial:</strong> Office buildings, retail spaces, warehouses</li>
                    <li><strong>Industrial:</strong> Manufacturing facilities, storage units</li>
                    <li><strong>REITs:</strong> Real Estate Investment Trusts - companies that own/operate income-producing real estate</li>
                    <li><strong>Crowdfunding:</strong> Pooling money with other investors for real estate projects</li>
                </ul>
                
                <h4>Benefits of Real Estate Investing</h4>
                <ul>
                    <li>Potential for steady cash flow through rental income</li>
                    <li>Property appreciation over time</li>
                    <li>Tax advantages (depreciation, mortgage interest deductions)</li>
                    <li>Hedge against inflation</li>
                    <li>Portfolio diversification</li>
                </ul>
                
                <h4>Risks of Real Estate Investing</h4>
                <ul>
                    <li>Requires significant capital investment</li>
                    <li>Lower liquidity compared to stocks and bonds</li>
                    <li>Property management responsibilities</li>
                    <li>Market fluctuations and economic downturns</li>
                    <li>Potential for unexpected expenses</li>
                </ul>
                
                <h4>Getting Started with Real Estate</h4>
                <p>For beginners, REITs offer an accessible way to invest in real estate without directly owning property. For direct ownership, start by researching local markets, understanding financing options, and possibly working with experienced real estate professionals.</p>
            `
        },
        'mutual-funds': {
            title: 'Mutual Funds',
            content: `
                <h3>Understanding Mutual Funds</h3>
                <p>Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.</p>
                
                <h4>Types of Mutual Funds</h4>
                <ul>
                    <li><strong>Equity Funds:</strong> Invest primarily in stocks</li>
                    <li><strong>Fixed Income Funds:</strong> Invest in bonds and other debt securities</li>
                    <li><strong>Balanced Funds:</strong> Invest in both stocks and bonds</li>
                    <li><strong>Index Funds:</strong> Track a specific market index like the S&P 500</li>
                    <li><strong>Sector Funds:</strong> Focus on specific industries</li>
                    <li><strong>Money Market Funds:</strong> Invest in short-term, high-quality investments</li>
                </ul>
                
                <h4>Benefits of Mutual Funds</h4>
                <ul>
                    <li>Professional management</li>
                    <li>Diversification across many securities</li>
                    <li>Accessibility with relatively low minimum investments</li>
                    <li>Liquidity - shares can be bought/sold daily</li>
                    <li>Variety of investment strategies and objectives</li>
                </ul>
                
                <h4>Understanding Fund Costs</h4>
                <ul>
                    <li><strong>Expense Ratio:</strong> Annual fee covering management and operational costs</li>
                    <li><strong>Load:</strong> Sales charge when buying (front-end) or selling (back-end) shares</li>
                    <li><strong>12b-1 Fees:</strong> Marketing and distribution expenses</li>
                </ul>
                
                <h4>Selecting Mutual Funds</h4>
                <p>When choosing mutual funds, consider your investment goals, risk tolerance, expense ratios, fund manager experience, historical performance (though past performance doesn't guarantee future results), and how the fund fits into your overall portfolio strategy.</p>
            `
        },
        'etfs': {
            title: 'ETFs',
            content: `
                <h3>Understanding ETFs (Exchange-Traded Funds)</h3>
                <p>ETFs are investment funds traded on stock exchanges, much like stocks. They hold assets such as stocks, bonds, or commodities and generally track an index.</p>
                
                <h4>Types of ETFs</h4>
                <ul>
                    <li><strong>Index ETFs:</strong> Track specific market indices like the S&P 500</li>
                    <li><strong>Sector ETFs:</strong> Focus on specific industries</li>
                    <li><strong>Bond ETFs:</strong> Invest in various types of bonds</li>
                    <li><strong>Commodity ETFs:</strong> Track commodities like gold or oil</li>
                    <li><strong>International ETFs:</strong> Invest in foreign markets</li>
                    <li><strong>Leveraged ETFs:</strong> Aim to multiply the returns of the underlying index</li>
                </ul>
                
                <h4>ETFs vs. Mutual Funds</h4>
                <ul>
                    <li><strong>Trading:</strong> ETFs trade throughout the day like stocks; mutual funds trade once daily after market close</li>
                    <li><strong>Costs:</strong> ETFs typically have lower expense ratios</li>
                    <li><strong>Tax Efficiency:</strong> ETFs are generally more tax-efficient</li>
                    <li><strong>Minimum Investment:</strong> ETFs require purchase of at least one share; mutual funds may have minimum dollar amounts</li>
                </ul>
                
                <h4>Benefits of ETFs</h4>
                <ul>
                    <li>Diversification across many securities</li>
                    <li>Lower expense ratios compared to many mutual funds</li>
                    <li>Trading flexibility (buy/sell throughout trading day)</li>
                    <li>Tax efficiency</li>
                    <li>Transparency of holdings</li>
                </ul>
                
                <h4>Getting Started with ETFs</h4>
                <p>ETFs can be an excellent way for beginners to start investing. Consider broad-market index ETFs that provide exposure to large segments of the market with low fees. As you gain experience, you might explore sector or specialized ETFs to target specific investment themes.</p>
            `
        },
        'retirement': {
            title: 'Retirement Planning',
            content: `
                <h3>Retirement Planning Essentials</h3>
                <p>Retirement planning involves determining retirement income goals and the actions and decisions necessary to achieve those goals.</p>
                
                <h4>Retirement Account Types</h4>
                <ul>
                    <li><strong>401(k)/403(b):</strong> Employer-sponsored retirement plans with tax advantages</li>
                    <li><strong>Traditional IRA:</strong> Tax-deductible contributions with tax-deferred growth</li>
                    <li><strong>Roth IRA:</strong> After-tax contributions with tax-free growth and withdrawals</li>
                    <li><strong>SEP IRA:</strong> Simplified Employee Pension for self-employed individuals</li>
                    <li><strong>Solo 401(k):</strong> 401(k) plan for self-employed individuals with no employees</li>
                </ul>
                
                <h4>Retirement Planning Strategies</h4>
                <ul>
                    <li><strong>Start Early:</strong> Take advantage of compound interest over time</li>
                    <li><strong>Maximize Employer Match:</strong> Contribute enough to get full employer matching in 401(k) plans</li>
                    <li><strong>Diversify Investments:</strong> Balance portfolio based on age and risk tolerance</li>
                    <li><strong>Catch-Up Contributions:</strong> Additional contributions allowed for those 50+ years old</li>
                    <li><strong>Tax Diversification:</strong> Mix of pre-tax and Roth accounts for tax flexibility in retirement</li>
                </ul>
                
                <h4>The 4% Rule</h4>
                <p>A common guideline suggesting that retirees can withdraw 4% of their retirement portfolio in the first year, then adjust for inflation each subsequent year, with a high probability of not outliving their money over a 30-year retirement.</p>
                
                <h4>Social Security Considerations</h4>
                <ul>
                    <li>Benefits can be claimed as early as age 62 (reduced amount)</li>
                    <li>Full retirement age is 66-67 depending on birth year</li>
                    <li>Delaying benefits until age 70 increases monthly payments</li>
                    <li>Consider spousal benefits and claiming strategies</li>
                </ul>
                
                <h4>Healthcare in Retirement</h4>
                <p>Plan for Medicare (eligibility at 65), supplemental insurance, and potential long-term care needs. Consider Health Savings Accounts (HSAs) as a tax-advantaged way to save for healthcare expenses in retirement.</p>
            `
        },
        'crypto': {
            title: 'Cryptocurrency',
            content: `
                <h3>Understanding Cryptocurrency</h3>
                <p>Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on decentralized networks based on blockchain technology.</p>
                
                <h4>Major Cryptocurrencies</h4>
                <ul>
                    <li><strong>Bitcoin (BTC):</strong> The first and most valuable cryptocurrency</li>
                    <li><strong>Ethereum (ETH):</strong> Features smart contracts and decentralized applications</li>
                    <li><strong>Binance Coin (BNB):</strong> Native to the Binance exchange</li>
                    <li><strong>Solana (SOL):</strong> Known for high transaction speeds</li>
                    <li><strong>Cardano (ADA):</strong> Focuses on security and sustainability</li>
                </ul>
                
                <h4>Benefits of Cryptocurrency</h4>
                <ul>
                    <li>Potential for high returns</li>
                    <li>24/7 market access</li>
                    <li>Portfolio diversification</li>
                    <li>Blockchain technology innovation</li>
                    <li>Protection against currency devaluation</li>
                </ul>
                
                <h4>Risks of Cryptocurrency</h4>
                <ul>
                    <li>Extreme price volatility</li>
                    <li>Regulatory uncertainty</li>
                    <li>Security concerns (hacking, scams)</li>
                    <li>Limited practical use cases</li>
                    <li>Environmental concerns (energy consumption)</li>
                </ul>
                
                <h4>Investing in Cryptocurrency</h4>
                <p><strong>Important:</strong> Cryptocurrency is considered a high-risk investment. Financial experts generally recommend limiting crypto investments to a small percentage of your portfolio (typically 1-5%) that you can afford to lose.</p>
                
                <h4>Getting Started</h4>
                <ul>
                    <li>Research thoroughly before investing</li>
                    <li>Start with established cryptocurrencies</li>
                    <li>Use reputable exchanges</li>
                    <li>Consider secure storage options (hardware wallets)</li>
                    <li>Be aware of tax implications</li>
                </ul>
            `
        },
        'tax-strategies': {
            title: 'Tax Strategies',
            content: `
                <h3>Tax-Efficient Investing Strategies</h3>
                <p>Tax-efficient investing aims to minimize tax liability while maximizing after-tax returns.</p>
                
                <h4>Tax-Advantaged Accounts</h4>
                <ul>
                    <li><strong>Traditional 401(k)/IRA:</strong> Tax-deductible contributions, tax-deferred growth</li>
                    <li><strong>Roth 401(k)/IRA:</strong> After-tax contributions, tax-free growth and withdrawals</li>
                    <li><strong>HSA:</strong> Triple tax advantage for healthcare (tax-deductible contributions, tax-free growth, tax-free withdrawals for qualified medical expenses)</li>
                    <li><strong>529 Plans:</strong> Tax-free growth and withdrawals for qualified education expenses</li>
                </ul>
                
                <h4>Asset Location Strategies</h4>
                <p>Place investments in accounts where they'll receive the most favorable tax treatment:</p>
                <ul>
                    <li><strong>Tax-Advantaged Accounts:</strong> Hold tax-inefficient investments (bonds, REITs, actively managed funds)</li>
                    <li><strong>Taxable Accounts:</strong> Hold tax-efficient investments (index funds, ETFs, municipal bonds)</li>
                </ul>
                
                <h4>Tax-Loss Harvesting</h4>
                <p>Selling investments at a loss to offset capital gains, potentially reducing tax liability. You can deduct up to $3,000 of net capital losses against ordinary income per year.</p>
                
                <h4>Tax-Efficient Withdrawal Strategies</h4>
                <ul>
                    <li>Consider tax brackets when planning withdrawals</li>
                    <li>Potentially withdraw from taxable accounts first, then tax-deferred, then tax-free</li>
                    <li>Roth conversions during lower-income years</li>
                    <li>Required Minimum Distributions (RMDs) planning</li>
                </ul>
                
                <h4>Other Tax Strategies</h4>
                <ul>
                    <li><strong>Charitable Giving:</strong> Donor-advised funds, qualified charitable distributions</li>
                    <li><strong>Estate Planning:</strong> Annual gift exclusions, lifetime exemption</li>
                    <li><strong>Tax Credits:</strong> Retirement saver's credit, child tax credit</li>
                    <li><strong>Business Owners:</strong> Retirement plan options, business deductions</li>
                </ul>
                
                <h4>Important Note</h4>
                <p>Tax laws change frequently. Consider consulting with a tax professional for personalized advice based on your specific situation and current tax laws.</p>
            `
        }
    };
    
    // Get content for selected category
    const content = knowledgeContent[category];
    
    // Update display
    if (content) {
        display.innerHTML = content.content;
    } else {
        display.innerHTML = '<h3>Select a category to learn more</h3><p>Click on any investment category to view detailed information, strategies, and tips.</p>';
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Setup dynamic loan form functionality
function setupLoanForm() {
    const addLoanBtn = document.getElementById('add-loan-btn');
    const loansContainer = document.getElementById('loans-container');
    
    // Skip if elements don't exist (e.g., on other pages)
    if (!addLoanBtn || !loansContainer) return;
    
    let loanCounter = 1;
    
    // Add loan button click handler
    addLoanBtn.addEventListener('click', () => {
        loanCounter++;
        
        // Create new loan item
        const loanItem = document.createElement('div');
        loanItem.className = 'loan-item';
        loanItem.innerHTML = `
            <div class="loan-item-header">
                <div class="loan-item-title">Loan #${loanCounter}</div>
                <div class="loan-item-remove"><i class="fas fa-times"></i></div>
            </div>
            <div class="loan-fields">
                <div class="form-group">
                    <label for="loan-type-${loanCounter}" class="tooltip-container">
                        Loan Type
                        <i class="fas fa-question-circle tooltip-icon"></i>
                        <span class="tooltip-text">Type of loan (e.g., student, auto, personal)</span>
                    </label>
                    <select id="loan-type-${loanCounter}" name="loan-type-${loanCounter}">
                        <option value="student">Student Loan</option>
                        <option value="auto">Auto Loan</option>
                        <option value="personal">Personal Loan</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="loan-balance-${loanCounter}" class="tooltip-container">
                        Current Balance
                        <i class="fas fa-question-circle tooltip-icon"></i>
                        <span class="tooltip-text">Remaining amount to be paid on this loan</span>
                    </label>
                    <input type="number" id="loan-balance-${loanCounter}" name="loan-balance-${loanCounter}" placeholder="$">
                </div>
                <div class="form-group">
                    <label for="loan-apr-${loanCounter}" class="tooltip-container">
                        Interest Rate (APR)
                        <i class="fas fa-question-circle tooltip-icon"></i>
                        <span class="tooltip-text">Annual Percentage Rate for this loan</span>
                    </label>
                    <input type="number" id="loan-apr-${loanCounter}" name="loan-apr-${loanCounter}" placeholder="%" step="0.01">
                </div>
                <div class="form-group">
                    <label for="loan-payment-${loanCounter}" class="tooltip-container">
                        Monthly Payment
                        <i class="fas fa-question-circle tooltip-icon"></i>
                        <span class="tooltip-text">Your current monthly payment amount</span>
                    </label>
                    <input type="number" id="loan-payment-${loanCounter}" name="loan-payment-${loanCounter}" placeholder="$">
                </div>
                <div class="form-group">
                    <label for="loan-term-${loanCounter}" class="tooltip-container">
                        Remaining Term
                        <i class="fas fa-question-circle tooltip-icon"></i>
                        <span class="tooltip-text">Months remaining on the loan term</span>
                    </label>
                    <input type="number" id="loan-term-${loanCounter}" name="loan-term-${loanCounter}" placeholder="months">
                </div>
            </div>
        `;
        
        // Add to container
        loansContainer.appendChild(loanItem);
        
        // Add remove button handler
        const removeBtn = loanItem.querySelector('.loan-item-remove');
        removeBtn.addEventListener('click', () => {
            loansContainer.removeChild(loanItem);
        });
    });
    
    // Add remove button handler for initial loan
    const initialRemoveBtn = document.querySelector('.loan-item-remove');
    if (initialRemoveBtn) {
        initialRemoveBtn.addEventListener('click', (e) => {
            // Don't remove if it's the last loan item
            if (loansContainer.querySelectorAll('.loan-item').length > 1) {
                const loanItem = e.target.closest('.loan-item');
                loansContainer.removeChild(loanItem);
            } else {
                alert('You must have at least one loan entry. Clear the fields instead if you have no loans.');
            }
        });
    }
}