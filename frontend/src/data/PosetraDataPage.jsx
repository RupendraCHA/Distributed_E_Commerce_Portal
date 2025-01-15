export const productsData = [
  'Salt',
  'Fries',
  'Medicines',
  'Equipment',
  'Haneya',
  'DMAG',
  'Hanelytics',
  'Curatum',
  'Posetra',
  'Chocolates',
];
export const solutionsData = ['Industry', 'Use Case'];
export const pricingData = [
  'List Price',
  'Discounts',
  'Promotional Price',
  'Rebates',
  'BOGO',
  'Customer Segmentation',
  'Tiered Pricing',
  'CSW (Custom Spend Waterfall)',
  'Trade Prices',
];
export const InventoryData = [
  'Planned Inventory',
  'Safety Stock',
  'Consigned Inventory',
  'Transit Inventory',
  'Field Inventory',
  'Intercompany Transfers',
  'Returns',
  'Stock Transfers',
];
export const QuotationData = [
  'Price',
  'Discounts',
  'Validity Period',
  'Status',
];
export const OrderData = [
  'Line Items',
  'Prices',
  'Discounts',
  'Upsell / Cross Sell',
  'Validity Period',
  'Status',
];
export const ShipData = [
  'shipping',
  'Transportation',
  'Bulk',
  'LTL',
  'Customer Pickup',
  'Shipment Cost',
];
export const InvoiceData = [
  'Payment Terms',
  'Taxes',
  'Collections',
  'Days of Outstanding',
];
export const DashboardsData = [
  'My Account',
  'My Address',
  'My Orders',
  'Open Orders',
  'Shipped Orders',
  'Track Orders',
  'Returns',
  'Refunds',
  'Logout',
];

const salts = [
  {
    productId: 'SALT001',
    productName: 'Morton Canning & Pickling Salt',
    category: 'Salt',
    brand: 'Morton',
    price: '$2.89',
    description:
      "A pure, all-natural, granulated salt that's designed for food canning and preservation.",
    weight: '4 lb',
    stock: 68,
    expirationDate: '2025-12-31',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1727197298/Pickle_Salt_esyftj.webp',
  },
  {
    productId: 'SALT002',
    productName: 'Morton Iodized Salt',
    category: 'Salt',
    brand: 'Morton',
    price: '$3.89',
    description:
      'An all-purpose salt that can be used for cooking, baking, and seasoning.',
    weight: '26 oz',
    stock: 86,
    expirationDate: '2025-12-31',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1727203126/Iodized_salt_f0nq9t.webp',
  },
  {
    productId: 'SALT003',
    productName: 'Morton Table Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Fine granulated table salt for everyday use.',
    price: '$2.99',
    weight: '1 lb',
    stock: 100,
    expirationDate: '2025-12-31',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729187823/mortan_table_salt_lt4dg8.webp',
  },
  {
    productId: 'SALT004',
    productName: 'Morton Sea Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'All-natural sea salt perfect for gourmet dishes.',
    price: '$5.99',
    weight: '2 lb',
    stock: 50,
    expirationDate: '2025-06-30',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729188380/sea_salt_uiamum.webp',
  },
  {
    productId: 'SALT005',
    productName: 'Morton Kosher Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Coarse kosher salt ideal for cooking.',
    price: '$3.49',
    weight: '1.5 lb',
    stock: 75,
    expirationDate: '2026-01-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729188380/kosher_salt_h01ti6.webp',
  },
  {
    productId: 'SALT006',
    productName: 'Morton Himalayan Pink Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Natural pink salt from the Himalayas.',
    price: '$6.49',
    weight: '1 lb',
    stock: 65,
    expirationDate: '2025-08-10',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729188533/pink_salt_oyiagd.webp',
  },
  {
    productId: 'SALT0099',
    productName: 'Morton Iodized Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Iodized salt for added nutritional benefits.',
    price: '$1.99',
    weight: '1 lb',
    stock: 150,
    expirationDate: '2025-09-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1727203126/Iodized_salt_f0nq9t.webp',
  },
  {
    productId: 'SALT100',
    productName: 'Morton Low Sodium Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Low sodium salt for healthier diets.',
    price: '$3.99',
    weight: '1 lb',
    stock: 80,
    expirationDate: '2025-11-20',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729188533/low_sodium_salt_rqyyeu.jpg',
  },
  {
    productId: 'SALT007',
    productName: 'Morton Smoked Sea Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Smoked sea salt for enhanced flavor.',
    price: '$7.99',
    weight: '1 lb',
    stock: 40,
    expirationDate: '2025-10-30',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189044/smoke_salt_vibie9.jpg',
  },
  {
    productId: 'SALT008',
    productName: 'Morton Rock Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Rock salt for deicing and other uses.',
    price: '$4.99',
    weight: '5 lb',
    stock: 120,
    expirationDate: '2027-01-01',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/rock_salt_rqx9kh.jpg',
  },
  {
    productId: 'SALT009',
    productName: 'Morton Pickling Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Perfect salt for pickling and preserving.',
    price: '$3.79',
    weight: '2 lb',
    stock: 60,
    expirationDate: '2026-03-01',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/pickle_salt_nkw0nw.jpg',
  },
  {
    productId: 'SALT010',
    productName: 'Morton Popcorn Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Ultra-fine salt for seasoning popcorn.',
    price: '$2.49',
    weight: '0.5 lb',
    stock: 100,
    expirationDate: '2025-07-20',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189042/popcorn_salt_q2yv4j.jpg',
  },
  {
    productId: 'SALT011',
    productName: 'Morton Canning Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Pure salt for canning and preserving food.',
    price: '$2.89',
    weight: '1.5 lb',
    stock: 90,
    expirationDate: '2025-12-10',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189043/pickle_salt_nkw0nw.jpg',
  },
  {
    productId: 'SALT012',
    productName: 'Morton Flaky Sea Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Flaky sea salt for garnishing dishes.',
    price: '$7.99',
    weight: '0.75 lb',
    stock: 50,
    expirationDate: '2026-02-28',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189712/flake_salt_gj7cut.jpg',
  },
  {
    productId: 'SALT013',
    productName: 'Morton Fleur de Sel',
    category: 'Salt',
    brand: 'Morton',
    description: 'Premium sea salt for finishing gourmet dishes.',
    price: '$8.99',
    weight: '0.5 lb',
    stock: 30,
    expirationDate: '2026-05-01',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189711/fleur_xsut1n.jpg',
  },
  {
    productId: 'SALT014',
    productName: 'Morton Garlic Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Seasoned salt with garlic for added flavor.',
    price: '$3.49',
    weight: '1 lb',
    stock: 110,
    expirationDate: '2025-08-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189710/garlic_salt_wrfs8g.jpg',
  },
  {
    productId: 'SALT015',
    productName: 'Morton Onion Salt',
    category: 'Salt',
    brand: 'Morton',
    description: 'Salt combined with onion for seasoning.',
    price: '$3.49',
    weight: '1 lb',
    stock: 90,
    expirationDate: '2025-08-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729189709/onion_salt_kg3ts5.jpg',
  },
];

const medicines = [
  {
    productId: 'MED001',
    productName: 'Advil',
    category: 'Medicines',
    brand: 'Morton',
    weight: '1 lb',
    price: '$12',
    description:
      'A drug used to treat fever, swelling, pain, and redness by preventing the body from making a substance that causes inflammation',
    Dosage: '2omg',
    stock: 90,
    expirationDate: '2025-08-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1727211295/Advil_vdvmdx.jpg',
  },
];

const fries = [
  {
    productId: 'FRD001',
    productName: 'Fries',
    category: 'fries',
    brand: 'Morton',
    weight: '2 lb',
    price: '$12',
    description:
      'Fast-food spot serving a menu of halal burgers, sandwiches and fries, plus desserts.',
    Dosage: '2omg',
    stock: 90,
    expirationDate: '2025-08-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729196336/fries_os1rib.webp',
  },
];

const chocolates = [
  {
    productId: 'CHC001',
    productName: 'Ferrero Rocher',
    category: 'chocolate',
    brand: 'Ferrero',
    weight: '5.3 oz',
    price: '$10',
    description:
      'A spherical chocolate treat with a crisp wafer shell, creamy hazelnut filling, and a whole hazelnut center, wrapped in golden foil.',
    dosage: 'N/A',
    stock: 100,
    expirationDate: '2025-12-31',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729225005/choc_1_onqmpn.webp',
  },
  {
    productId: 'CHC002',
    productName: 'Lindor',
    category: 'chocolate',
    brand: 'Lindt & Sprüngli',
    weight: '3.5 oz',
    price: '$7',
    description:
      'Premium Swiss chocolate available in various varieties such as milk, dark, and white chocolate, known for its smooth and rich texture.',
    dosage: 'N/A',
    stock: 150,
    expirationDate: '2026-01-15',
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729225004/lindor_mlcxgc.webp',
  },
];

const curatum = {
  customProduct: true,
  content: {
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1728863952/ad975682-0279-498c-b614-8b151b9eedb7_bheli8.png',
    title: 'Curatum',
    headLine: 'Secure, govern, and control information access.',
    shortDesc:
      'Our pre-packaged IT governance, risk, and compliance solution automates SAP GRC implementation, addressing the complexity of compliance management, reducing manual processes, and ensuring seamless integration across systems. It accelerates implementation, offers cost-effective scalability, and enhances security and reporting for proactive risk management.',
    youtubeVideo: 'https://www.youtube.com/watch?v=jeqKIhT-rc8',
  },
  products: [
    {
      productId: 'CURATUM001',
      productName: 'Pilot',
      productDesc: [
        'Identify and create the framework for the information access and security, enabling the pilot to have the important features.',
        'Bring pre-configured processes, libraries, compliance frameworks.',
        'Create strategy around different GRC systems.',
      ],
      contract: '1 Month min. contract duration',
      price: '$29000',
    },
    {
      productId: 'CURATUM002',
      productName: 'Low Complexity Scenario',
      productDesc: [
        'Manage the migration of data related to access controls, rule sets, workflows, and various risk and mitigation controls.',
        'Support the transfer of data from third-party GRC systems to the SAP GRC system.',
        'Facilitate streamlined documentation and risk assessments during the migration process.',
        'Configure common settings and analyze access risks.',
        'Manage emergency access, access requests, and business roles.',
        'Enhance access management workflows to improve the security and compliance of user roles and profiles.',
      ],
      contract: '3 Month min. contract duration',
      price: '$199000',
    },
    {
      productId: 'CURATUM003',
      productName: 'Medium Complexity Scenario',
      productDesc: [
        'Manage the migration of data related to access controls, rule sets, workflows, and various risk and mitigation controls.',
        'Support the transfer of data from third-party GRC systems to the SAP GRC system.',
        'Facilitate streamlined documentation and risk assessments during the migration process.',
        'Configure common settings and analyze access risks.',
        'Manage emergency access, segregation of duties, access requests, and business roles.',
        'Enhance access management workflows to improve the security and compliance of user roles and profiles.',
        'Use a library of compliance policies and procedures.',
      ],
      contract: '6 Month min. contract duration',
      price: '$119000',
    },
    {
      productId: 'CURATUM004',
      productName: 'High Complexity Scenario',
      productDesc: [
        'Manage the migration of data related to access controls, rule sets, workflows, and various risk and mitigation controls.',
        'Support the transfer of data from third-party GRC systems to the SAP GRC system.',
        'Facilitate streamlined documentation and risk assessments during the migration process.',
        'Configure common settings and analyze access risks.',
        'Manage emergency access, access requests, and business roles.',
        'Enhance access management workflows to improve the security and compliance of user roles and profiles.',
        'Includes options to set up regulations, organizational structures, risk libraries, and control objectives, ensuring comprehensive governance over enterprise processes.',
      ],
      contract: '12 Month min. contract duration',
      price: '$249000',
    },
  ],
};

const hanelytics = {
  customProduct: true,
  content: {
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1728864046/Hanelytics_qglsap.png',
    title: 'Hanelytics',
    headLine: 'Optimize Supply Chain Management with AI and ML Solutions',
    shortDesc:
      'An advanced AI and ML platform that seamlessly integrates data modeling, algorithms, machine learning, and statistical analysis to derive actionable insights from both ERP data, including SAP S/4HANA, and non-ERP data sources. This platform facilitates real-time predictions, process automation, and data-driven competitive advantages, revolutionizing supply chain management.',
    youtubeVideo: 'https://www.youtube.com/watch?v=2ZxMiTZ5ers',
  },
  products: [
    {
      productId: 'HANELY001',
      productName: 'Pilot',
      productDesc: [
        'Integrates diverse sources such as SAP, Salesforce, IoT, Digital Media, GIS, Sensor data, alongside SAP S/4HANA and Microsoft ERP systems, providing a comprehensive data integration capability.',
        'Offers powerful visualization and predictive analytics using leading tools like Power BI, Tableau, and Alteryx Designer, ensuring data-driven decision-making.',
        'Leverages advanced AI and ML models to predict inventory needs, equipment failures, and customer demands with high precision, enhancing operational efficiency.',
      ],
      contract: '1 Month min. contract duration',
      price: '$25000',
    },
    {
      productId: 'HANELY002',
      productName: 'Low Complexity Scenario',
      productDesc: [
        'Integrates diverse sources such as SAP, Salesforce, IoT, Digital Media, GIS, Sensor data, alongside SAP S/4HANA and Microsoft ERP systems, providing a comprehensive data integration capability.',
        'Offers powerful visualization and predictive analytics using leading tools like Power BI, Tableau, and Alteryx Designer, ensuring data-driven decision-making.',
        'Leverages advanced AI and ML models to predict inventory needs, equipment failures, and customer demands with high precision, enhancing operational efficiency.',
      ],
      contract: '3 Month min. contract duratio',
      price: '$199000',
    },
    {
      productId: 'HANELY003',
      productName: 'Medium Complexity Scenario',
      productDesc: [
        'Integrates diverse sources such as SAP, Salesforce, IoT, Digital Media, GIS, Sensor data, alongside SAP S/4 HANA and Microsoft ERP systems, providing a comprehensive data integration capability.',
        'Offers powerful visualization and predictive analytics using leading tools like Power BI, Tableau, and Alteryx Designer, ensuring data-driven decision-making.',
        'Leverages advanced AI and ML models to predict inventory needs, equipment failures, and customer demands with high precision, enhancing operational efficiency.',
      ],
      contract: '5 Month min. contract duration',
      price: '$299000',
    },
    {
      productId: 'HANELY004',
      productName: 'High Complexity Scenario',
      productDesc: [
        'Integrates diverse sources such as SAP, Salesforce, IoT, Digital Media, GIS, Sensor data, alongside SAP S/4HANA and Microsoft ERP systems, providing a comprehensive data integration capability.',
        'Offers powerful visualization and predictive analytics using leading tools like Power BI, Tableau, and Alteryx Designer, ensuring data-driven decision-making.',
        'Leverages advanced AI and ML models to predict inventory needs, equipment failures, and customer demands with high precision, enhancing operational efficiency.',
      ],
      contract: '6 Month min. contract duration',
      price: '$449000',
    },
    {
      productId: 'HANELY005',
      productName: 'Enterprise',
      productDesc: [
        'Integrates diverse sources such as SAP, Salesforce, IoT, Digital Media, GIS, Sensor data, alongside SAP S/4HANA and Microsoft ERP systems, providing a comprehensive data integration capability.',
        'Offers powerful visualization and predictive analytics using leading tools like Power BI, Tableau, and Alteryx Designer, ensuring data-driven decision-making.',
        'Leverages advanced AI and ML models to predict inventory needs, equipment failures, and customer demands with high precision, enhancing operational efficiency.',
      ],
      contract: '6 Month min. contract duration',
      price: '$649000',
    },
  ],
};

const dmag = {
  customProduct: true,
  content: {
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1728864046/Hanelytics_qglsap.png',
    title: 'Dmag',
    headLine: 'Seamless Data Move to SAP S/4HANA',
    shortDesc:
      'DMAG provides compelling value by migrating data from SAP and Non-SAP systems, automating data inconsistencies in the source systems such as SAP ERP system, JD Edwards etc, and making the data transformed, mapped and business ready. DMAG converts the data to be compatible with SAP S/4HANA for Materials, Business Partners, G/L, Profit Centers, Cost Centers, Digital Assets etc. and Transnational Data.',
  },
  products: [
    {
      productId: 'HANELY001',
      productName: 'Free Trial',
      productDesc: [
        'DMAG Software License is provided, while the client self-implements it.',
        'Includes 1 User.',
        '5 Day max. contract duration.',
      ],
      contract: '5 Day(s)',
      price: 'Free',
    },
    {
      productId: 'HANELY002',
      productName: 'Small License',
      productDesc: [
        'Software license is installed along with implementation services for a low complexity scenario.',
        'Includes 1 User.',
      ],
      contract: 'One-time',
      price: '$15,000.00',
    },
    {
      productId: 'HANELY003',
      productName: 'Trial License',
      productDesc: [
        'All DMAG Features are available.',
        'Includes 1 User.',
        '1 Month min. contract duration.',
      ],
      contract: '1 Month',
      price: 'Price Upon Request',
    },
    {
      productId: 'HANELY004',
      productName: 'Medium License',
      productDesc: [
        'Software license is installed along with an implementation service for a medium complexity scenario.',
        'Includes 1 User.',
      ],
      contract: 'One-time',
      price: 'Price Upon Request',
    },
    {
      productId: 'HANELY005',
      productName: 'Large License',
      productDesc: [
        'Software license is installed along with an implementation service for a medium complexity scenario.',
        'Includes 1 User.',
      ],
      contract: 'One-time',
      price: 'Price Upon Request',
    },
    {
      productId: 'HANELY006',
      productName: 'Enterprise License',
      productDesc: [
        'Software license is installed along with implementation services for a high complexity scenario for a large Enterprise.',
        'Includes 1 User.',
      ],
      contract: 'Per Month',
      price: '$150,000.00',
    },
    {
      productId: 'HANELY007',
      productName: 'Tiered Edition',
      productDesc: ['Includes 1 User.'],
      contract: 'Per Month',
      price: 'Price Upon Request',
    },
  ],
};

const haneya = {
  customProduct: true,
  content: {
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729007251/Visionsoft_logo_ychpmi.jpg',
    title: 'Haneya',
    headLine: 'Cut your SAP S/4HANA Migration Costs in Half',
    shortDesc:
      'Our ROBOTIC SAP S/4HANA migration solution encapsulates all migration activities together to handle the SAP HANA migration for SoH and SAP S/4HANA in an automated process with minimal human interaction and optimizes the cost and effort by 40-50%. HANEYA is a Process Configuration, Master Data Remediation, Security Role updates, and a Custom code remediation tool that remediates custom code incompatibilities, replaces obsolete transactions and tables, and updates security roles automatically.',
    youtubeVideo: 'https://www.youtube.com/watch?v=C9pAjgM-iLY',
  },
  products: [
    {
      productId: 'HANEYA001',
      productName: 'Free',
      productDesc: [
        'Free Trial',
        'Includes 1 User',
        '14 Day max. contract duration',
      ],
      contract: '14 Day(s) max. contract duration',
      price: 'Free',
    },
    {
      productId: 'HANEYA002',
      productName: 'Haneya Lite',
      productDesc: [
        'All features of HANEYA with less than 1000 custom objects remediation',
        'Includes 1 User',
        '14 Day max. contract duration',
      ],
      contract: '14 Day max. contract duration',
      price: 'USD 0.00',
      additionalFee: '+ USD 50,000.00 Setup Fee',
    },
    {
      productId: 'HANEYA003',
      productName: 'Haneya General',
      productDesc: [
        'General availability - Flexi Plan',
        'Includes 1 Migration Instance',
      ],
      contract: 'One-time',
      price: 'USD 180,000.00',
      additionalFee: '+ USD 100,000.00 Setup Fee',
    },
    {
      productId: 'HANEYA004',
      productName: 'Haneya Heavy',
      productDesc: [
        'Greater than 1000 custom objects remediation',
        'Includes 1 User',
      ],
      contract: '1 Month min. contract duration',
      price: 'Price TBD',
    },
  ],
};
const posetra = {
  customProduct: true,
  content: {
    image:
      'https://res.cloudinary.com/dppznstlh/image/upload/v1729007220/Posetra_logo_page-0002_tkgyhd.jpg',
    title: 'POSETRA',
    headLine:
      'Advanced E-Commerce Platform Integrating with SAP S/4HANA and ERP Systems',
    shortDesc:
      'Distributors in B2B commerce often face EDI challenges due to inadequate infrastructure. Our solution solves this by enabling direct order placement via the manufacturer’s website, offering product search, pricing inquiries, inventory checks, shipment tracking, and payment gateway integration with SAP S/4HANA.',
    youtubeVideo: 'https://www.youtube.com/watch?v=lTiwAhiXMT0',
  },
  products: [
    {
      productId: 'POSETRA001',
      productName: 'Basic Plan',
      productDesc: [
        'License fees, software installation, and technical support of the software',
        '12 Month min. contract duration',
      ],
      contract: '12 Month min. contract duration',
      price: 'USD 99,000.00 One-time',
    },
    {
      productId: 'POSETRA002',
      productName: 'Low Complexity Scenario',
      productDesc: [
        'Removes the need for complex and costly EDI infrastructure, allowing businesses to focus on web-based order management.',
        'Manages out-of-stock inventory while offering backorder functionality.',
        'Fully encrypted login and transaction processes ensuring high security.',
      ],
      contract: 'Per Quarter, 12 Month min. contract duration',
      price: 'From USD 125,000.00 per Quarter',
    },
    {
      productId: 'POSETRA003',
      productName: 'Medium Complexity Scenario',
      productDesc: [
        'Offers pre-configured product substitutes automatically when items are out of stock, minimizing customer disruption.',
        'Schedule recurring orders to automate procurement and streamline the purchasing process.',
        'Tracks and updates order statuses in real-time, integrated with SAP S/4HANA.',
      ],
      contract: '5 Month min. contract duration',
      price: 'From USD 175,000.00 per Month',
    },
    {
      productId: 'POSETRA004',
      productName: 'High Complexity Scenario',
      productDesc: [
        'Track past orders and reorder from previous transactions to streamline repeat purchases.',
        'Automatically suggest substitute products when an item is out of stock.',
        'Manage out-of-stock items with backorder capabilities to avoid order disruptions.',
        'Enables real-time shipment tracking for greater transparency.',
      ],
      contract: 'Per 6 Months, 6 Month min. contract duration',
      price: 'USD 225,000.00',
    },
    {
      productId: 'POSETRA005',
      productName: 'Enterprise Plan',
      productDesc: [
        'Track past orders and reorder from previous transactions to streamline repeat purchases.',
        'Schedule automatic recurring orders for consistent supply management.',
        'Manages out-of-stock items with backorder capabilities to avoid order disruptions.',
        'Enables real-time shipment tracking for greater transparency in the supply chain.',
        'Seamless integration with SAP S/4HANA and other ERP systems for efficient data exchange.',
      ],
      contract: '12 Month min. contract duration',
      price: 'USD 325,000.00 per Year',
    },
  ],
};

export const categories = {
  salts,
  medicines,
  fries,
  curatum,
  hanelytics,
  dmag,
  haneya,
  posetra,
  chocolates,
};
