import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { s, colors } from "lib/styles";
import { isWeb } from "platform/detection";
import type { ConfirmModal } from "#/state/modals";
import { useModalControls } from "#/state/modals";
import { Text } from "#/components/Typography";
import { atoms, useTheme } from "#/alf";

export const snapPoints = ["50%"];

export function Component({
  title,
  message,
  onPressConfirm,
  onPressCancel,
  confirmBtnText,
  confirmBtnStyle,
  cancelBtnText,
}: ConfirmModal) {
  const t = useTheme();
  const { closeModal } = useModalControls();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const onPress = async () => {
    setIsProcessing(true);
    try {
      await onPressConfirm();
      closeModal();
      return;
    } catch (e: any) {
      setIsProcessing(false);
    }
  };
  return (
    <View testID="confirmModal" style={[t.atoms.bg, styles.container]}>
      <Text style={[styles.title]}>{title}</Text>
      {typeof message === "string" ? (
        <Text style={[styles.description]}>{message}</Text>
      ) : (
        message()
      )}
      <View style={s.flex1} />
      {isProcessing ? (
        <View style={[styles.btn, s.mt10]}>
          <ActivityIndicator />
        </View>
      ) : (
        <TouchableOpacity
          testID="confirmBtn"
          onPress={onPress}
          style={[styles.btn, confirmBtnStyle]}
          accessibilityRole="button"
        >
          <Text style={[s.white, s.bold, s.f18]}>
            {confirmBtnText ?? "Onayla"}
          </Text>
        </TouchableOpacity>
      )}
      {onPressCancel === undefined ? null : (
        <TouchableOpacity
          testID="cancelBtn"
          onPress={onPressCancel}
          style={[styles.btnCancel, s.mt10]}
        >
          <Text style={atoms.font_normal}>{cancelBtnText ?? "İptal"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: isWeb ? 0 : 60,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 22,
    marginBottom: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    padding: 14,
    marginTop: 22,
    marginHorizontal: 44,
    backgroundColor: colors.blue3,
  },
  btnCancel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    padding: 14,
    marginHorizontal: 20,
  },
});
