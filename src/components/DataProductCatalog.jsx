import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Users, Calendar, Database, BarChart3, FileText, Eye, Download, Shield, Tag, Bell, Settings as SettingsIcon, Heart, X as XIcon, CheckCircle, ArrowRight, PlusCircle } from 'lucide-react';

const DataProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile'); // 'profile', 'settings', 'access', 'favorites'

  const [currentUser, setCurrentUser] = useState({
    name: 'Andrei Gromov',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHVProt0AvVMg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678930638885?e=1753920000&v=beta&t=2_bPpuxvtesR_aIsj8VPk3EWdnH-bS3CFYlxNr_VMPM',
    email: 'a.gromov@autodoc.eu', // Добавим email
    issuedAccess: [1, 4], // ID продуктов, к которым есть доступ
    favorites: [2, 6]     // ID избранных продуктов
  });

  const [notifications, setNotifications] = useState([
    {
      id: 'n4', // Новый уникальный ID
      type: 'new_product', // Новый тип для нового продукта
      text: 'New report added: Employee Performance & Engagement Report!',
      timestamp: new Date().toISOString(), // Текущее время или недавнее
      read: false, // Непрочитанное
      productId: 9, // ID вашего нового отчета
      link: '#' // Заглушка для ссылки
    },
    { id: 'n1', type: 'update', text: 'Sales Performance Dashboard was updated.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: false, productId: 1, link: '#' },
    { id: 'n2', type: 'comment', text: 'New comment on your favorited Customer Segmentation Report.', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(), read: true, productId: 2, link: '#' },
    { id: 'n3', type: 'access', text: 'You have been granted access to the Financial KPI Dataset.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: false, productId: 3, link: '#' },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    // В реальном приложении здесь может быть переход по ссылке уведомления
    // Например, setSelectedProduct(products.find(p => p.id === notification.productId));
    // setIsNotificationsOpen(false); // Можно закрывать панель после клика
  };

  // Мок данные для демонстрации
  const mockProducts = [
    {
      id: 1,
      name: 'Sales Performance Dashboard',
      description: 'Comprehensive sales analytics dashboard providing real-time tracking of key performance indicators (KPIs) like revenue, conversion rates, and sales growth. Features advanced forecasting models based on historical data and market trends to help sales teams make informed decisions and optimize strategies.',
      category: 'tableau', // Изначально было tableau, оставим так или поменять на powerbi? По заданию нужно добавлять PowerBI репорты. Для этого примера я оставлю как есть, но новые будут PowerBI.
      type: 'Dashboard',
      owner: 'Sales Analytics Team',
      rating: 4.8,
      users: 145,
      lastUpdated: '2025-01-20',
      tags: ['sales', 'analytics', 'real-time', 'forecasting', 'kpi'],
      dataSource: 'CRM System, ERP, SalesForce',
      refreshRate: 'Daily',
      accessLevel: 'Internal',
      features: ['Real-time metrics', 'Predictive forecasting models', 'Export to Excel/PDF', 'Mobile responsive design', 'Customizable alerts'],
      comments: [
        { id: 'c1-1', user: 'Elena Petrova', avatar: 'https://i.pravatar.cc/150?u=elena', text: 'Great dashboard, very insightful!', timestamp: '2025-01-20T10:30:00Z' },
        { id: 'c1-2', user: 'Ivan Sidorov', avatar: 'https://i.pravatar.cc/150?u=ivan', text: 'Helped us a lot with forecasting.', timestamp: '2025-01-26T14:15:00Z' },
        { id: 'c1-3', user: 'João Silva', avatar: 'https://i.pravatar.cc/150?u=joao', text: 'The daily refresh is crucial for our morning stand-ups. Excellent work!', timestamp: '2025-04-27T08:00:00Z' }
      ]
    },
    {
      id: 2,
      name: 'Customer Segmentation Report',
      description: 'Advanced customer segmentation analysis utilizing machine learning algorithms to identify distinct customer groups based on behavioral patterns, purchasing history, and demographic insights. Helps tailor marketing strategies and improve customer engagement.',
      category: 'powerbi', // Изначально было tableau, поменял на powerbi для примера
      type: 'Report',
      owner: 'Marketing Intelligence',
      rating: 4.6,
      users: 89,
      lastUpdated: '2025-02-10',
      tags: ['customer', 'segmentation', 'marketing', 'demographics', 'ml'],
      dataSource: 'Customer Database, Web Analytics, Survey Data',
      refreshRate: 'Weekly',
      accessLevel: 'Restricted',
      features: ['Behavioral pattern analysis', 'Demographic & psychographic insights', 'Interactive drill-down charts', 'Scheduled email delivery', 'Persona generation aids'],
      comments: [
        { id: 'c2-1', user: 'Anna Karenina', avatar: 'https://i.pravatar.cc/150?u=anna', text: 'Very detailed report. Useful for our campaigns.', timestamp: '2025-02-12T09:00:00Z' },
        { id: 'c2-2', user: 'Sofia Costa', avatar: 'https://i.pravatar.cc/150?u=sofia', text: 'The segmentation is much clearer now, thanks to this report.', timestamp: '2025-03-19T11:20:00Z' }
      ]
    },
    {
      id: 3,
      name: 'Financial KPI Dataset',
      description: 'A curated and validated dataset containing key financial performance indicators (KPIs) and historical metrics. Designed for executive reporting, financial modeling, and in-depth analysis. Includes data on revenue, profitability, liquidity, and solvency ratios.',
      category: 'dataset',
      type: 'Dataset',
      owner: 'Finance Data Team',
      rating: 4.9,
      users: 67,
      lastUpdated: '2025-02-22',
      tags: ['finance', 'kpi', 'executive', 'metrics', 'dataset', 'modeling'],
      dataSource: 'ERP, Financial Systems, Accounting Software',
      refreshRate: 'Real-time',
      accessLevel: 'Confidential',
      features: ['Real-time data feeds', 'Executive-ready summaries', 'API access for developers', 'Historical trend analysis tools', 'Data dictionary included'],
      comments: [
          { id: 'c3-1', user: 'Pedro Almeida', avatar: 'https://i.pravatar.cc/150?u=pedro', text: 'Crucial dataset for our quarterly reviews. Very reliable.', timestamp: '2025-03-17T15:00:00Z' }
      ]
    },
    {
      id: 4,
      name: 'Operational Efficiency Report',
      description: 'Comprehensive operational metrics and efficiency indicators across all major departments. This report helps identify bottlenecks, optimize resource allocation, and track improvements in operational workflows, leading to cost savings and enhanced productivity.',
      category: 'tableau', // Изначально было powerbi, поменял на tableau для примера
      type: 'Dashboard', // Был Report, изменил на Dashboard для разнообразия
      owner: 'Operations Analytics',
      rating: 4.7,
      users: 123,
      lastUpdated: '2025-03-09',
      tags: ['operations', 'efficiency', 'metrics', 'departments', 'kpi', 'optimization'],
      dataSource: 'HR System, Production DB, Logistics System',
      refreshRate: 'Hourly',
      accessLevel: 'Internal',
      features: ['Cross-departmental metrics', 'Efficiency tracking dashboards', 'Trend and root cause analysis', 'Automated alerts system', 'Process mining capabilities'],
      comments: [
          { id: 'c4-1', user: 'Maria Oliveira', avatar: 'https://i.pravatar.cc/150?u=maria', text: 'The hourly refresh rate is fantastic for monitoring production.', timestamp: '2025-04-24T16:45:00Z' }
      ]
    },
    {
      id: 5,
      name: 'HR Analytics Dataset',
      description: 'Anonymized dataset covering employee performance metrics, retention rates, satisfaction survey results, and demographic data. Ideal for HR business partners and analysts to build predictive models for talent management and improve workplace engagement.',
      category: 'dataset',
      type: 'Dataset',
      owner: 'Human Resources',
      rating: 4.4,
      users: 45,
      lastUpdated: '2025-03-15',
      tags: ['hr', 'performance', 'retention', 'satisfaction', 'employee', 'talent'],
      dataSource: 'HRIS, Survey Platform, Performance Reviews',
      refreshRate: 'Monthly',
      accessLevel: 'Restricted',
      features: ['Key performance metrics', 'Employee retention analysis', 'Survey data integration', 'Compliance-ready anonymization', 'Diversity & Inclusion metrics'],
      comments: []
    },
    {
      id: 6,
      name: 'Supply Chain Analytics',
      description: 'End-to-end supply chain visibility dashboard providing insights into inventory levels, vendor performance, logistics costs, and delivery times. Helps optimize inventory, reduce lead times, and mitigate supply chain risks through data-driven alerts and scenario modeling.',
      category: 'tableau', // Изначально было tableau
      type: 'Dashboard',
      owner: 'Supply Chain Team',
      rating: 4.8,
      users: 78,
      lastUpdated: '2025-04-01',
      tags: ['supply-chain', 'logistics', 'vendors', 'performance', 'inventory', 'risk'],
      dataSource: 'SCM System, Logistics API, IoT Sensor Data',
      refreshRate: 'Real-time',
      accessLevel: 'Internal',
      features: ['Real-time shipment tracking', 'Vendor performance scorecards', 'Landed cost optimization models', 'Supply chain risk monitoring', 'Demand forecasting integration'],
      comments: [
          { id: 'c6-1', user: 'Lucas Pereira', avatar: 'https://i.pravatar.cc/150?u=lucas', text: 'This has transformed our supply chain visibility. The risk monitoring is a game changer.', timestamp: '2025-05-01T10:10:00Z' }
      ]
    },
    {
      id: 7,
      name: 'Marketing Campaign ROI Analysis Report',
      description: 'This Power BI report delivers a deep dive into marketing campaign performance, meticulously tracking return on investment (ROI) across various channels. It analyzes key metrics such as cost per acquisition (CPA), customer lifetime value (CLV) generated by campaigns, and channel-specific conversion rates. Interactive visuals allow marketers to filter by campaign, time period, and target audience сегмент, enabling data-driven decisions for future marketing spend and strategy optimization.',
      category: 'powerbi',
      type: 'Report',
      owner: 'Marketing Analytics Department',
      rating: 4.7,
      users: 65,
      lastUpdated: '2025-04-15',
      tags: ['marketing', 'roi', 'campaign analysis', 'powerbi', 'cpa', 'clv', 'channel performance'],
      dataSource: 'Google Analytics, Ads Platforms (Google, Meta), CRM, HubSpot',
      refreshRate: 'Daily',
      accessLevel: 'Internal',
      features: ['Comprehensive ROI calculation', 'Channel effectiveness breakdown', 'CPA and CLV tracking', 'Audience segment performance', 'Budget allocation recommendations', 'Trend analysis over time'],
      comments: [
        { id: 'c7-1', user: 'Beatriz Santos', avatar: 'https://i.pravatar.cc/150?u=beatriz', text: 'Finally, a clear view of our campaign ROI! The channel breakdown is extremely helpful.', timestamp: '2025-04-21T11:00:00Z' },
        { id: 'c7-2', user: 'Tiago Ferreira', avatar: 'https://i.pravatar.cc/150?u=tiago', text: 'Helps us justify our marketing spend to stakeholders. Great visuals.', timestamp: '2025-05-11T14:30:00Z' }
      ]
    },
    {
      id: 8,
      name: 'Website Traffic & Conversion Funnel Report',
      description: 'This dynamic Power BI report provides a comprehensive overview of website traffic sources, user behavior, and conversion funnel performance. It tracks metrics like unique visitors, bounce rate, session duration, page views per session, and conversion rates at each stage of the funnel (e.g., from landing page to sign-up or purchase). It helps identify drop-off points and optimize the user journey for better engagement and higher conversion outcomes. Includes A/B test result comparisons.',
      category: 'powerbi',
      type: 'Report',
      owner: 'Digital Marketing Team',
      rating: 4.6,
      users: 71,
      lastUpdated: '2025-04-29',
      tags: ['web analytics', 'conversion funnel', 'traffic analysis', 'powerbi', 'user behavior', 'seo', 'ux'],
      dataSource: 'Google Analytics, Adobe Analytics, Hotjar, Mixpanel',
      refreshRate: 'Daily',
      accessLevel: 'Internal',
      features: ['Traffic source breakdown', 'Funnel visualization & analysis', 'Bounce rate & exit page identification', 'User journey mapping', 'A/B testing performance comparison', 'Goal completion tracking'],
      comments: [
        { id: 'c9-1', user: 'Rafael Alves', avatar: 'https://i.pravatar.cc/150?u=rafael', text: 'Essential for understanding our website performance. The funnel visualization is top-notch.', timestamp: '2025-05-01T17:00:00Z' },
        { id: 'c9-2', user: 'Mariana Lima', avatar: 'https://i.pravatar.cc/150?u=mariana', text: 'We identified a major drop-off point thanks to this. Already working on a fix!', timestamp: '2025-05-14T09:30:00Z' }
      ]
    },
    {
      id: 9,
      name: 'Employee Performance & Engagement Report',
      description: 'A Power BI report designed for HR and management to monitor and analyze employee performance trends and engagement levels. It integrates data from performance reviews, employee satisfaction surveys, training completion rates, and absenteeism records. The report provides insights into departmental performance, identifies high-potential employees, and highlights areas for improving workplace culture and employee retention strategies. Includes sentiment analysis from survey comments.',
      category: 'powerbi',
      type: 'Report',
      owner: 'Human Resources Analytics',
      rating: 5.0,
      users: 3,
      lastUpdated: '2025-05-26',
      tags: ['hr', 'employee performance', 'engagement', 'powerbi', 'kpi', 'talent management', 'retention'],
      dataSource: 'HRIS, Performance Management System, SurveyMonkey, LMS',
      refreshRate: 'Monthly',
      accessLevel: 'Restricted',
      features: ['Performance KPI tracking', 'Engagement survey analysis', 'Turnover rate prediction', 'Training impact assessment', 'Sentiment analysis of feedback', 'Manager-specific dashboards'],
      comments: [
        { id: 'c8-1', user: 'Ana Clara Rodrigues', avatar: 'https://i.pravatar.cc/150?u=anaclara', text: 'This report gives us actionable insights for our HR initiatives.', timestamp: '2025-05-26T10:15:00Z' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Grid },
    { id: 'powerbi', name: 'Power BI', icon: FileText },
    { id: 'tableau', name: 'Tableau', icon: BarChart3 },
    { id: 'dataset', name: 'Datasets', icon: Database }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const getAccessLevelColor = (level) => {
    switch(level) {
      case 'Internal': return 'bg-green-100 text-green-800';
      case 'Restricted': return 'bg-yellow-100 text-yellow-800';
      case 'Confidential': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRequestAccess = (product) => {
    alert(`Access request submitted for ${product.name}. You will be notified once approved.`);
  };

  const NotificationPanel = ({ notifications, onClose, onNotificationClick, unreadCount }) => {
    if (!notifications) return null;

    return (
      <div className="absolute top-14 right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-red-500 text-white font-semibold px-2 py-0.5 rounded-full">{unreadCount} new</span>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm p-6 text-center">No notifications yet.</p>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => onNotificationClick(notification.id)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'opacity-70' : 'font-medium'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-1.5 rounded-full ${
                    notification.type === 'update' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'access' ? 'bg-purple-100 text-purple-600' : 
                    notification.type === 'new_product' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {notification.type === 'update' && <BarChart3 size={16} />}
                    {notification.type === 'comment' && <Users size={16} />}
                    {notification.type === 'access' && <CheckCircle size={16} />}
                    {notification.type === 'new_product' && <PlusCircle size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm text-gray-700 mb-0.5 ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full self-center" title="New notification"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
          <button onClick={onClose} className="text-sm text-blue-600 hover:underline">Close</button>
        </div>
      </div>
    );
  };

  const ProductCard = ({ product, isGrid = true, onToggleFavorite, isFavorite }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${isGrid ? '' : 'flex gap-4'}`}
         onClick={() => setSelectedProduct(product)}>
      <div className={`${isGrid ? 'p-6' : 'p-4 flex-1'}`}>
        <div className={`${isGrid ? 'mb-4' : 'mb-2 flex items-start gap-4'}`}>
          {isGrid && (
            <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                {/* Используем иконку в зависимости от категории для разнообразия, или Database по умолчанию */}
                {product.category === 'powerbi' && <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />}
                {product.category === 'tableau' && <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-2" />}
                {product.category === 'dataset' && <Database className="w-12 h-12 text-green-600 mx-auto mb-2" />}
                {(!['powerbi', 'tableau', 'dataset'].includes(product.category)) && <Database className="w-12 h-12 text-gray-600 mx-auto mb-2" />}
                <span className="text-sm text-gray-600">{product.type}</span>
              </div>
            </div>
          )}
          <div className={isGrid ? '' : 'flex-1'}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(product.accessLevel)}`}>
                {product.accessLevel}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p> {/* Добавлен line-clamp-2 для ограничения описания */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{product.users} users</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(product.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">
              +{product.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{product.owner}</span>
          </div>
          <div className="flex items-center gap-2"> {/* Обертка для кнопок */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={(e) => { /* ... */ }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleToggleFavorite = (productId) => {
    setCurrentUser(prevUser => {
      const newFavorites = prevUser.favorites.includes(productId)
        ? prevUser.favorites.filter(id => id !== productId)
        : [...prevUser.favorites, productId];
      return { ...prevUser, favorites: newFavorites };
    });
  };

  const ProductModal = ({ product, onClose }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
      if (!newComment.trim()) return;
      // В реальном приложении это бы обновляло состояние comments в родительском компоненте или отправляло на сервер
      // Для демонстрации, можно добавить комментарий в мок-данные локально, но это не обновит UI без перерендера или управления состоянием
      const newCommentObj = {
        id: `c${product.id}-${(product.comments?.length || 0) + 1}`, // простой генератор ID
        user: currentUser.name, // Используем текущего пользователя
        avatar: currentUser.avatar,
        text: newComment,
        timestamp: new Date().toISOString()
      };
      // Это НЕ обновит UI, так как mockProducts не является состоянием, которое перерисовывает модальное окно.
      // product.comments.push(newCommentObj);
      alert(`Comment added (mock for UI update): "${newComment}" by ${currentUser.name} for product ${product.name}. \nRefresh or re-open modal to see if data was mutated (not recommended for prod).`);
      setNewComment('');
      // Для реального обновления UI, нужно было бы обновить состояние `products` в DataProductCatalog
      // и передать его или функцию обновления в модальное окно.
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"> {/* Добавлен overflow-y-auto */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {product.users} users
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(product.accessLevel)}`}>
                    {product.accessLevel}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 -m-1" // Улучшил кликабельность крестика
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  {product.category === 'powerbi' && <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-2" />}
                  {product.category === 'tableau' && <Database className="w-16 h-16 text-purple-600 mx-auto mb-2" />}
                  {product.category === 'dataset' && <FileText className="w-16 h-16 text-green-600 mx-auto mb-2" />}
                  {(!['powerbi', 'tableau', 'dataset'].includes(product.category)) && <Database className="w-16 h-16 text-gray-600 mx-auto mb-2" />}
                  <span className="text-lg text-gray-700">{product.type}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Owner</h4>
                  <p className="text-gray-600">{product.owner}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Type</h4>
                  <p className="text-gray-600">{product.type}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Data Source</h4>
                  <p className="text-gray-600">{product.dataSource}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Refresh Rate</h4>
                  <p className="text-gray-600">{product.refreshRate}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3 pt-4 border-t border-gray-200">Comments ({product.comments?.length || 0})</h3>
                <div className="space-y-4 mb-4 max-h-48 overflow-y-auto pr-2"> {/* Уменьшил max-h для комментариев */}
                  {product.comments && product.comments.length > 0 ? (
                    product.comments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full mt-1 flex-shrink-0" />
                        <div className="bg-gray-50 p-3 rounded-lg flex-1 min-w-0"> {/* Добавил min-w-0 для правильного переноса текста */}
                          <p className="text-sm font-medium text-gray-800 break-words">{comment.user}</p>
                          <p className="text-sm text-gray-600 mb-1 break-words">{comment.text}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(comment.timestamp).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No comments yet.</p>
                  )}
                </div>
                {/* Add Comment Form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div> {/* Закрытие space-y-6 */}

            <div className="flex gap-3 pt-6"> {/* Увеличил отступ для кнопок */}
              <button
                onClick={() => {
                  handleRequestAccess(product);
                  onClose(); // Закрыть модальное окно после запроса
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Request Access
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Preview (mock)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ProfileModal = ({ user, onClose, products, activeTab, setActiveTab, onToggleFavorite }) => {
    if (!user) return null;

    const userFavorites = products.filter(p => user.favorites.includes(p.id));
    const userAccessList = products.filter(p => user.issuedAccess.includes(p.id));

    const renderTabContent = () => {
      switch (activeTab) {
        case 'profile':
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Member since January 2024.</p>
              {/* Дополнительная информация профиля */}
            </div>
          );
        case 'settings':
          return (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Settings</h3>
              <p className="text-gray-600">Interface language, notification preferences, password change, etc.</p>
              <p className="mt-4 text-sm text-gray-400 italic">(Settings functionality is not implemented in this demo.)</p>
            </div>
          );
        case 'access':
          return (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Issued Access ({userAccessList.length})</h3>
              {userAccessList.length > 0 ? (
                <ul className="space-y-2">
                  {userAccessList.map(product => (
                    <li key={product.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <span className="text-gray-700">{product.name}</span>
                      <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded-full">Access Granted</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No access granted to any products yet.</p>
              )}
            </div>
          );
        case 'favorites':
          return (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Favorite Products ({userFavorites.length})</h3>
              {userFavorites.length > 0 ? (
                <ul className="space-y-3">
                  {userFavorites.map(product => (
                    <li key={product.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-blue-600">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.owner}</p>
                        </div>
                        <button
                          onClick={() => onToggleFavorite(product.id)}
                          className="p-1.5 text-red-500 hover:text-red-700"
                          title="Remove from favorites"
                        >
                          <Heart fill="currentColor" size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">You haven't added any products to your favorites yet.</p>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    const tabs = [
      { id: 'profile', name: 'My Profile', icon: Users },
      { id: 'favorites', name: 'Favorites', icon: Heart },
      { id: 'access', name: 'My Access', icon: Shield },
      { id: 'settings', name: 'Settings', icon: SettingsIcon },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60]"> {/* z-index выше чем у ProductModal */}
        <div className="bg-white rounded-xl max-w-2xl md:max-w-3xl w-full max-h-[85vh] flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">User Account</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XIcon size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar Tabs */}
            <nav className="w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 p-2 md:p-3">
              <ul className="space-y-1">
                {tabs.map(tab => {
                  const TabIcon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                          ${activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                          }`}
                      >
                        <TabIcon size={18} className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`} />
                        {tab.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="https://www.autodoc.parts/assets/54eb94/images/favicon-196x196.png"
                alt="Autodoc Logo"
                className="w-8 h-8 mr-3" // Используем те же классы для размера и отступа, что и у иконки
              />
              <h1 className="text-xl font-bold text-gray-900">Data Product Catalog</h1>
            </div>
            <div className="flex items-center gap-3"> {/* Уменьшил gap до 3 */}
              {/* Поиск */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..." // Сократил плейсхолдер
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-60 md:w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" // Адаптивная ширина
                />
              </div>
              {/* Группа кнопок и профиль */}
              <div className="relative flex items-center gap-1 border-l border-gray-200 pl-3"> {/* Добавил relative для позиционирования панели */}
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  // ... (остальные атрибуты кнопки вида)
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                </button>

                {/* Колокольчик уведомлений */}
                <button
                  onClick={() => setIsNotificationsOpen(prev => !prev)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>
                {isNotificationsOpen && (
                  <NotificationPanel
                    notifications={notifications}
                    onClose={() => setIsNotificationsOpen(false)}
                    onNotificationClick={handleNotificationClick}
                    unreadCount={unreadNotificationsCount}
                  />
                )}

                {/* Профиль пользователя - сделаем его кликабельным позже */}
                <div
                  onClick={() => setIsProfileModalOpen(true)} // <--- Добавим это позже
                  className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg"
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentUser.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8"> {/* Адаптивная колонка/строка */}
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0"> {/* Адаптивная ширина */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`} />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-semibold text-gray-800">{products.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold text-gray-800">547</span> {/* Мок */}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New This Week</span>
                  <span className="font-semibold text-green-600">12</span> {/* Мок */}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2"> {/* Адаптивность */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                </p>
              </div>
              {/* Можно добавить сюда сортировку или другие фильтры в будущем */}
            </div>

            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' // Адаптивность колонок
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isGrid={viewMode === 'grid'}
                    onToggleFavorite={handleToggleFavorite} // <--- Передаем функцию
                    isFavorite={currentUser.favorites.includes(product.id)} // <--- Передаем статус избранного
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {isProfileModalOpen && (
        <ProfileModal // Теперь этот вызов должен работать корректно
          user={currentUser}
          onClose={() => setIsProfileModalOpen(false)}
          products={products}
          activeTab={activeProfileTab}
          setActiveTab={setActiveProfileTab}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
};

export default DataProductCatalog;