
Template.registerHelper( 'capitalize', ( string ) => {
  if ( string ) {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
  }
});

Template.registerHelper( 'lowercase', ( string ) => {
  if ( string ) {
    return string.toLowerCase();
  }
});

Template.registerHelper( 'parseMarkdown', ( string ) => {
  if ( string && parseMarkdown ) {
    return parseMarkdown( string );
  }
});

Template.registerHelper( 'equals', ( valueOne, valueTwo ) => {
  return valueOne === valueTwo;
});

Template.registerHelper( 'notEqual', ( valueOne, valueTwo ) => {
  return valueOne !== valueTwo;
});

Template.registerHelper( 'or', ( valueOne, valueTwo ) => {
  return valueOne || valueTwo;
});

Template.registerHelper( 'and', function( valueOne, valueTwo ) {
  return valueOne && valueTwo;
});

Template.registerHelper( 'selected', ( valueOne, valueTwo ) => {
  return valueOne === valueTwo ? 'selected' : '';
});

Template.registerHelper( 'checked', ( valueOne, valueTwo ) => {
  return valueOne === valueTwo ? 'checked' : '';
});

Template.registerHelper("disableButtonIfUploadNotComplete", function(value){
   value = parseInt(value);
   if (!_.isNaN(value)){
     return value > 0 && value < 100 ? 'disabled' : ''
   }
});
