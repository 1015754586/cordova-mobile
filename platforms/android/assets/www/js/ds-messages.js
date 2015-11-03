var MESSAGES = (function() {
  var properties = {
    'TIME_ORDER_ERROR': 'Start date can not be later than end date!',
    'SPRINT_ORDER_ERROR': 'Start sprint can not be later than end sprint!',
    'TIME_FORMAT_ERROR': 'Date format error!',
    'MISS_END_DATE': 'Please input the endDate!',
    'MISS_START_DATE': 'Please input the startDate!',
    'SAVE_QUERY_SUCCESS': 'Save query successfully!',
    'UNKNOWN_ERROR': 'Error occurs when getting data',
    'EDITABLE_API_ADD_PARAMETER_ERROR': 'Editable api mode can not add parameter! You can edit parameters in the API text directly,or you can delete the parameters which are typed after character "?"',
    'CHART_SUPPORT_ERROR': 'This API does not support report chart,you can analyse data below directly.',
    'CHART_GENERATE_ERROR': 'Can not generate the chart',
    'EMPTY_PARAMETER_ERROR_PREFIX': 'Parameter: ',
    'EMPTY_PARAMETER_ERROR_SUFFIX': ' can not be empty!',
    'NUMBER_PARAMETER_ERROR_SUFFIX': ' should be a number!',
    'INTEGER_PARAMETER_ERROR_SUFFIX': ' should be an integer greater than 0!',
    'REQUIRED_PARAMETER_ERROR_PREFIX': 'Parameter: ',
    'REQUIRED_PARAMETER_ERROR_SUFFIX': ' is required!',
    'RELYON_PARAMETER_MISSING_ERROR_PREFIX': 'Rely on parameter: ',
    'RELYON_PARAMETER_MISSING_ERROR_SUFFIX': ' is missing!',
    'GENERATE_IFRAME_CODE_MESSAGE': 'Generating iframe code ...',
    'GENERATE_IFRAME_BUTTON_MESSAGE': 'Generating ...',
    'SERVER_ERROR': 'Can not execute this API call. Please check whether your API URL is right.\n If there\'s nothing wrong, please contact ds-dev-list@redhat.com to report this issue.',
    'TIMEOUT_ERROR': 'Request timeout.',
    'EXTERNAL_URL_ERROR': 'You must input an internal API url.',
    'PARAMETER_VALUE_LOAD_MESSAGE': 'Loading ...',
    'EITHER_EMPTY_ERROR_PREFIX': 'At least one of parameters: ',
    'EITHER_EMPTY_ERROR_SUFFIX': ' can not be empty',
    'EITHER_PARAMETER_ERROR_PREFIX': 'At least one of parameters: ',
    'EITHER_PARAMETER_ERROR_SUFFIX': ' is required!',
    'GENERATE_CHART_MESSAGE': 'Please generate a chart first.',
    // favorite api related message
    'NO_FAVOR_API': 'No Favorite API',
    'NO_IFRAME': 'No Iframes',
    'ADD_FAVOR_API': 'Adding...',
    'FAVOR_API_SUCCESS': 'Success',
    'FAVOR_API_FAILURE': 'Failure',
    'ADD_CHART_API': 'Adding ...',
    'CHART_API_SUCCESS': 'Success',
    'CHART_API_FAILURE': 'Failure',
    'DASHBOARD_NAME_MISSING': 'Please input dashboard name!',
    'DASHBOARD_NOT_FOUND': 'Dashboard is not found',
    'DELETE_ENSURE_PREFIX': 'You want to delete ',
    'UPDATE_ENSURE_PREFIX': 'You want to update ',
    'ADD_TO_DASH': 'Add to dashboard ',
    'SAVE_ENSURE_PREFIX': 'You want to save dashboard ',
    // dashboard share message
    'EMPTY_EMAIL': 'Please input an email address',
    'NO_EMAIL_TO_SHARE': 'Please add an email address',
    'EMAIL_FORMAT_ERROR': 'Email format is wrong',
    'COMMON_ERROR_MSG': 'Error occurs',
    'NO_PARENT_MSG': 'Input %parent% first',
    'NO_VALUES_MSG': 'No option',
    'NO_HIGHCHART_MSG': 'Data is empty.',
    'IFRAME_UPDATE_SUCCESS' : 'The chart has been updated successfully',
    'IFRAME_UPDATE_ERROR' : 'The chart can not be updated successfully',
    'USED_BUTTON_TEXT' : 'Entries From Used APIs',
    'RENDER_PARAM_ERROR_PREFIX' : "clone ",
    'RENDER_PARAM_ERROR_SUFFIX' : " type paramter fail!",
    'RENDER_DATE_PARAM_ERROR': 'clone date type paramter fail!',
    'RENDER_SELECT_PARAM_ERROR': 'clone select type paramter fail!',
    'RENDER_MULTIPLE_PARAM_ERROR': 'clone multiple type paramter fail!',
    'RENDER_INPUT_PARAM_ERROR': 'clone input type paramter fail!',
    'UPDATE_EFFECTIVE_REMINDER' : 'Please click preview button to make your changes effective',
    'MEMBERS_EMPTY_ERROR' : 'Members can not be empty',
    'COMMON_SUCCESS' : 'Success'
  };
  return {
    get: function(name) {
      return properties[name];
    }
  };
})();