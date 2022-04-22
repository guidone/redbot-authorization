import React from 'react';
import { plug } from 'code-plug';


import { HelpElements, withConfigurationPage } from '../../src/components';
const { NodeRedNode, SlugHelp, TypeCommand } = HelpElements;


import AuthorizationForm from './views/suspend-form';
import ConfigurationForm from './views/configuration-form';

// authorize form in user modal
plug('user-tabs', AuthorizationForm, {
  id: 'suspend-user',
  label: 'Access',
  permission: 'users.authorize'
});

// configuration panel
const Legend = () => (
  <div>
    <NodeRedNode>Authorization</NodeRedNode>
      <p>Set the chatbot private, only authorized user will be able to use the chatbot. Set the authorization in the users section.</p>
      <p>For public chatbot it's possibile to suspend a user.</p>
  </div>
);

plug('sidebar', null, {
  permission: 'configure',
  id: 'configuration',
  label: 'Configuration',
  icon: 'cog',
  options: [
    {
      id: 'authorization',
      label: 'Bot Access',
      url: '/authorization',
    }
  ]
});
plug(
  'pages',
  withConfigurationPage(
    'redbot-authorization',
    ConfigurationForm,
    { Legend, title: 'Bot Access' }
  ),
  {
    permission: 'configure',
    url: '/authorization',
    title: 'Welcome Message',
    id: 'page-authorization'
  }
);

plug(
  'permissions',
  null,
  {
    permission: 'users.authorize',
    name: 'Authorize/Suspend',
    description: 'Authorize or suspend a user',
    group: 'Users'
  }
);
