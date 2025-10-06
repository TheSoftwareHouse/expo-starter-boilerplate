export type SpacingValue = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;

export interface SpacingProps {
  // Shorthand padding props
  p?: SpacingValue; // padding
  pt?: SpacingValue; // paddingTop
  pb?: SpacingValue; // paddingBottom
  pl?: SpacingValue; // paddingLeft
  pr?: SpacingValue; // paddingRight
  px?: SpacingValue; // paddingHorizontal
  py?: SpacingValue; // paddingVertical

  // Shorthand margin props
  m?: SpacingValue; // margin
  mt?: SpacingValue; // marginTop
  mb?: SpacingValue; // marginBottom
  ml?: SpacingValue; // marginLeft
  mr?: SpacingValue; // marginRight
  mx?: SpacingValue; // marginHorizontal
  my?: SpacingValue; // marginVertical
}

export const getSpacingValue = (
  value: SpacingValue | undefined,
  theme: { spacing: (value: number) => number },
): number | undefined => {
  if (value === undefined || value === 'none') return undefined;
  if (typeof value === 'number') return theme.spacing(value);

  const spacingMap = {
    xs: theme.spacing(1),
    sm: theme.spacing(2),
    md: theme.spacing(4),
    lg: theme.spacing(6),
    xl: theme.spacing(8),
    xxl: theme.spacing(12),
  };

  return spacingMap[value as keyof typeof spacingMap];
};

export const createSpacingStyles = (props: SpacingProps, theme: { spacing: (value: number) => number }) => {
  const { p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my } = props;

  return {
    // Handle shorthand p (padding)
    ...(getSpacingValue(p, theme) !== undefined && {
      padding: getSpacingValue(p, theme),
    }),

    // Handle shorthand m (margin)
    ...(getSpacingValue(m, theme) !== undefined && {
      margin: getSpacingValue(m, theme),
    }),

    // Handle specific padding props
    ...(getSpacingValue(pt, theme) !== undefined && {
      paddingTop: getSpacingValue(pt, theme),
    }),
    ...(getSpacingValue(pb, theme) !== undefined && {
      paddingBottom: getSpacingValue(pb, theme),
    }),
    ...(getSpacingValue(pl, theme) !== undefined && {
      paddingLeft: getSpacingValue(pl, theme),
    }),
    ...(getSpacingValue(pr, theme) !== undefined && {
      paddingRight: getSpacingValue(pr, theme),
    }),
    ...(getSpacingValue(px, theme) !== undefined && {
      paddingHorizontal: getSpacingValue(px, theme),
    }),
    ...(getSpacingValue(py, theme) !== undefined && {
      paddingVertical: getSpacingValue(py, theme),
    }),

    // Handle specific margin props
    ...(getSpacingValue(mt, theme) !== undefined && {
      marginTop: getSpacingValue(mt, theme),
    }),
    ...(getSpacingValue(mb, theme) !== undefined && {
      marginBottom: getSpacingValue(mb, theme),
    }),
    ...(getSpacingValue(ml, theme) !== undefined && {
      marginLeft: getSpacingValue(ml, theme),
    }),
    ...(getSpacingValue(mr, theme) !== undefined && {
      marginRight: getSpacingValue(mr, theme),
    }),
    ...(getSpacingValue(mx, theme) !== undefined && {
      marginHorizontal: getSpacingValue(mx, theme),
    }),
    ...(getSpacingValue(my, theme) !== undefined && {
      marginVertical: getSpacingValue(my, theme),
    }),
  };
};
