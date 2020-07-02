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
    'authorization',
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
