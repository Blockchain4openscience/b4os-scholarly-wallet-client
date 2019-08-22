export const defaults = {
  minZoom: 0.5,
  maxZoom: 1.0,
  selectionType: 'additive',
  boxSelectionEnabled: true,
  elements: {
    nodes: []
  },
  style: [
    {
      selector: 'node',
      style: {
        'border-color': '#000',
        'border-width': 2,
        'border-opacity': 0.5,
        width: 40,
        height: 40,
        'background-color': 'white',
        'background-fit': 'cover',
        'text-outline-width': 1,
        'text-outline-color': 'white',
        'text-wrap': 'wrap',
        'text-max-width': 400,
        'text-margin-y': -5
      }
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': 'red',
        'target-arrow-color': 'red'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': '6px',
        'border-color': 'red'
      }
    },
    {
      selector: 'node[name]',
      style: {
        content: 'data(name)',
        color: 'darkcyan'
      }
    },

    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        label: 'cites',
        'text-outline-width': 1,
        'text-outline-color': 'white'
      }
    },
    {
      selector: '.github',
      style: {
        'background-image': '../assets/img/github.png'
      }
    },

    {
      selector: '.orcid',
      style: {
        'background-image': '../assets/img/orcid_icon.png'
      }
    },

    {
      selector: '.figshare',
      style: {
        'background-image': '../assets/img/figshare_logo.png'
      }
    },

    {
      selector: '.eh-handle',
      style: {
        'background-color': '#000',
        'background-opacity': 0.5,
        width: 12,
        height: 12,
        shape: 'tag',
        'overlay-opacity': 0,
        'border-width': 12,
        'border-opacity': 0
      }
    },

    {
      selector: '.eh-hover',
      style: {
        'background-color': 'darkcyan'
      }
    },

    {
      selector: '.eh-source',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },

    {
      selector: '.eh-target',
      style: {
        'border-width': 2,
        'border-color': 'darkcyan'
      }
    },

    {
      selector: '.eh-preview, .eh-ghost-edge',
      style: {
        'background-color': 'darkcyan',
        'line-color': 'darkcyan',
        'target-arrow-color': 'darkcyan',
        'source-arrow-color': 'darkcyan'
      }
    },

    {
      selector: '.eh-ghost-edge.eh-preview-active',
      style: {
        opacity: 0
      }
    }
  ]
};
