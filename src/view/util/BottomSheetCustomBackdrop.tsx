import React, { useMemo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export function createCustomBackdrop(
  onClose?: (() => void) | undefined
): React.FC<BottomSheetBackdropProps> {
  const CustomBackdrop = ({
    animatedIndex,
    style,
  }: BottomSheetBackdropProps) => {
    // animated variables
    const opacity = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value, // current snap index
        [-1, 0], // input range
        [0, 0.5], // output range
        Extrapolation.CLAMP
      ),
    }));

    const containerStyle = useMemo(
      () => [style, { backgroundColor: "#000" }, opacity],
      [style, opacity]
    );

    return (
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={containerStyle} />
      </TouchableWithoutFeedback>
    );
  };
  return CustomBackdrop;
}
