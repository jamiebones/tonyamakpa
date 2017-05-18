
AdminConfig = {
  name: 'Tony Amankpa',
  adminEmails: ['jamiebones2000@yahoo.co.uk'],
//  skin: 'black-light',
  collections: {

    Academic_Paper : {
   	showDelColumn: true,
    },
   Book_Review : {
    	showDelColumn: true,
    },
    School_Events : {
    	showDelColumn: true,
   },
   History_Today : {
    	showDelColumn: true,
    },
    Media : {
    showDelColumn: true,
    },
   News : {
   	showDelColumn: true,
   },
    Newsletter : {
    	showDelColumn: true,
   },
    Submited_TermPaper : {
   	showDelColumn: true,
    },
   TermPaper : {
     icon: 'pencil',
     tableColumns: [
              {label: 'Paper Name', name: 'paper_name'},
              {label: 'Created Date', name: 'date_created'}
          ],
     omitFields: ['submiter']


   },

    Courses : {
    	showDelColumn: true,
    },


 },
};
//sample code to add link to the sidebar
//AdminDashboard.addSidebarItem('Analytics', {
//  icon: 'line-chart',
//  urls: [
//    { title: 'Statistics', url: AdminDashboard.path('/analytics/statistics') },
//    { title: 'Settings', url: AdminDashboard.path('/analytics/settings') }
//  ]
//});
