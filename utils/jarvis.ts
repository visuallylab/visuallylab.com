import { ActionType, TemplateType, DataType } from '@/constants/actionRouter';
import { Focus } from '@/contexts/actionRouter';

export function getActionType(action: string | null) {
  if (!action) {
    return '';
  }
  switch (action) {
    case 'see':
    case 'tell':
    case 'show': {
      return ActionType.Show;
    }
    case 'analyze':
    case 'compare': {
      return ActionType.Compare;
    }
    case 'find':
    case 'focus': {
      return ActionType.Focus;
    }
    default: {
      // TODO: need to think how to implement default;
      return '';
    }
  }
}

export function getTemplateType(data: string | null): TemplateType | '' {
  let templateType: TemplateType | '' = '';
  switch (data) {
    case 'home': {
      templateType = TemplateType.Home;
      break;
    }
    case 'status': {
      templateType = TemplateType.Realtime;
      break;
    }
    case 'statistics': {
      templateType = TemplateType.Statistics;
      break;
    }
    case 'traffic status': {
      templateType = TemplateType.T_Realtime;
      break;
    }
    case 'electricity status': {
      templateType = TemplateType.E_Realtime;
      break;
    }
    case 'traffic statistics': {
      templateType = TemplateType.T_Statistics;
      break;
    }
  }
  return templateType;
}

export function getDataTypes(data: string[]) {
  const dataTypes: DataType[] = [];
  data.forEach(cur => {
    switch (cur) {
      case 'backup capacity': {
        dataTypes.push(DataType.E_BackupCapacity);
        break;
      }
      case 'electricity transfer value': {
        dataTypes.push(DataType.E_TransferValue);
        break;
      }
      case 'electricity generated value': {
        dataTypes.push(DataType.E_GeneratedValue);
        break;
      }
    }
  });
  return dataTypes;
}

export function getFocus(status: string | null): Focus[] {
  if (status) {
    return [];
  }
  return [];
}
