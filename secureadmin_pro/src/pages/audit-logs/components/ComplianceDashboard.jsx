import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Icon from 'components/AppIcon';

const ComplianceDashboard = ({ logs }) => {
  // Calculate dashboard metrics
  const totalLogs = logs.length;
  const successfulActions = logs.filter(log => log.status === 'SUCCESS').length;
  const failedActions = logs.filter(log => log.status === 'FAILED').length;
  const highRiskEvents = logs.filter(log => log.riskLevel === 'HIGH').length;
  const uniqueUsers = new Set(logs.map(log => log.user.id)).size;

  // Prepare chart data
  const actionTypeData = logs.reduce((acc, log) => {
    const action = log.action.replace(/_/g, ' ');
    acc[action] = (acc[action] || 0) + 1;
    return acc;
  }, {});

  const actionChartData = Object.entries(actionTypeData).map(([action, count]) => ({
    action,
    count
  }));

  const statusData = [
    { name: 'Success', value: successfulActions, color: '#059669' },
    { name: 'Failed', value: failedActions, color: '#DC2626' },
    { name: 'Pending', value: logs.filter(log => log.status === 'PENDING').length, color: '#D97706' }
  ].filter(item => item.value > 0);

  const riskLevelData = [
    { name: 'Low', value: logs.filter(log => log.riskLevel === 'LOW').length, color: '#059669' },
    { name: 'Medium', value: logs.filter(log => log.riskLevel === 'MEDIUM').length, color: '#D97706' },
    { name: 'High', value: logs.filter(log => log.riskLevel === 'HIGH').length, color: '#DC2626' }
  ].filter(item => item.value > 0);

  // Timeline data (last 7 days)
  const timelineData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayLogs = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate.toDateString() === date.toDateString();
    });
    
    timelineData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: dayLogs.length,
      success: dayLogs.filter(log => log.status === 'SUCCESS').length,
      failed: dayLogs.filter(log => log.status === 'FAILED').length,
      high_risk: dayLogs.filter(log => log.riskLevel === 'HIGH').length
    });
  }

  const topUsers = logs.reduce((acc, log) => {
    const userId = log.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        name: log.user.name,
        email: log.user.email,
        role: log.user.role,
        count: 0,
        riskEvents: 0
      };
    }
    acc[userId].count++;
    if (log.riskLevel === 'HIGH') {
      acc[userId].riskEvents++;
    }
    return acc;
  }, {});

  const topUsersArray = Object.values(topUsers)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentAnomalies = logs
    .filter(log => log.riskLevel === 'HIGH' || log.status === 'FAILED')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Events</p>
              <p className="text-2xl font-bold text-text-primary">{totalLogs.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={24} className="text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+12%</span>
            <span className="text-text-secondary ml-1">from last week</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Success Rate</p>
              <p className="text-2xl font-bold text-text-primary">
                {totalLogs > 0 ? Math.round((successfulActions / totalLogs) * 100) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+5%</span>
            <span className="text-text-secondary ml-1">from last week</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">High Risk Events</p>
              <p className="text-2xl font-bold text-text-primary">{highRiskEvents}</p>
            </div>
            <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingDown" size={16} className="text-error mr-1" />
            <span className="text-error">-8%</span>
            <span className="text-text-secondary ml-1">from last week</span>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Users</p>
              <p className="text-2xl font-bold text-text-primary">{uniqueUsers}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+3%</span>
            <span className="text-text-secondary ml-1">from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Activity Timeline (7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
                <Area type="monotone" dataKey="high_risk" stackId="2" stroke="#DC2626" fill="#DC2626" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Types Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Action Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={actionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="action" 
                  stroke="#64748B" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Status and Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {statusData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-text-secondary">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Risk Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskLevelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {riskLevelData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-text-secondary">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Top Users and Recent Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Active Users */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Most Active Users</h3>
          <div className="space-y-4">
            {topUsersArray.map((user, index) => (
              <div key={user.name} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{user.name}</div>
                    <div className="text-sm text-text-secondary">{user.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-text-primary">{user.count} events</div>
                  {user.riskEvents > 0 && (
                    <div className="text-sm text-error">{user.riskEvents} high risk</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Anomalies */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Security Events</h3>
          <div className="space-y-4">
            {recentAnomalies.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-error-50 border border-error-200 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  log.riskLevel === 'HIGH' ? 'bg-error' : 'bg-warning'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary">{log.action.replace(/_/g, ' ')}</span>
                    <span className="text-xs text-text-secondary">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {log.user.name} • {log.ipAddress}
                  </div>
                  <div className="text-xs text-error mt-1">
                    {log.status === 'FAILED' ? 'Action Failed' : 'High Risk Activity'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;