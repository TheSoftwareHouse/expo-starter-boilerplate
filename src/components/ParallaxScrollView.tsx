import type { PropsWithChildren, ReactElement } from 'react';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollOffset } from 'react-native-reanimated';

import { useStyles } from '@/hooks';
import { Box } from '@/components/ui/Box';

import { parallaxScrollViewStyles, HEADER_HEIGHT } from './ParallaxScrollView.styles';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export function ParallaxScrollView({ children, headerImage, headerBackgroundColor }: Props) {
  const { theme, rt } = useStyles();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const backgroundColor = theme.colors.background;
  const headerBgColor = rt.themeName === 'dark' ? headerBackgroundColor.dark : headerBackgroundColor.light;

  return (
    <Animated.ScrollView ref={scrollRef} style={{ backgroundColor, flex: 1 }} scrollEventThrottle={16}>
      <Animated.View style={[parallaxScrollViewStyles.header, { backgroundColor: headerBgColor }, headerAnimatedStyle]}>
        {headerImage}
      </Animated.View>
      <Box style={parallaxScrollViewStyles.content}>{children}</Box>
    </Animated.ScrollView>
  );
}
