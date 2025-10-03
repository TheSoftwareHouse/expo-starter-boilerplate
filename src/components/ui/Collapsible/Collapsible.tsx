import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useStyles } from '@/hooks';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Typography } from '@/components/ui/Typography';
import { Box } from '@/components/ui/Box';

import { collapsibleStyles } from './Collapsible.styles';

export interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  testID?: string;
}

export function Collapsible({
  children,
  title,
  defaultOpen = false,
  testID = 'collapsible',
}: PropsWithChildren<CollapsibleProps>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { theme } = useStyles();

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Box testID={testID}>
      <TouchableOpacity
        style={collapsibleStyles.heading}
        onPress={toggleOpen}
        activeOpacity={0.8}
        testID={`${testID}-header`}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme.colors.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <Typography weight="bold">{title}</Typography>
      </TouchableOpacity>
      {isOpen && (
        <Box style={collapsibleStyles.content} testID={`${testID}-content`}>
          {children}
        </Box>
      )}
    </Box>
  );
}
