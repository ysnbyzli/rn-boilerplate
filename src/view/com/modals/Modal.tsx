import { StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import { useModals, useModalControls } from "#/state/modals";
import * as ConfirmModal from "./Confirm";

import { useTheme } from "#/alf";
import { createCustomBackdrop } from "#/view/util/BottomSheetCustomBackdrop";

const DEFAULT_SNAPPOINTS = ["90%"];
const HANDLE_HEIGHT = 24;

export function ModalsContainer() {
  const t = useTheme();
  const { isModalActive, activeModals } = useModals();
  const { closeModal } = useModalControls();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const activeModal = activeModals[activeModals.length - 1];

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeModal();
    }
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
    closeModal();
  };

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name]);

  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS;
  let element;
  if (activeModal?.name === "confirm") {
    snapPoints = ConfirmModal.snapPoints;
    element = <ConfirmModal.Component {...activeModal} />;
  } else {
    return null;
  }

  if (snapPoints[0] === "fullscreen") {
    return (
      <SafeAreaView style={[styles.fullscreenContainer, t.atoms.bg]}>
        {element}
      </SafeAreaView>
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleHeight={HANDLE_HEIGHT}
      index={isModalActive ? 0 : -1}
      enablePanDownToClose
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      backdropComponent={
        isModalActive ? createCustomBackdrop(onClose) : undefined
      }
      handleIndicatorStyle={{ backgroundColor: t.atoms.text.color }}
      handleStyle={[styles.handle, t.atoms.bg]}
      onChange={onBottomSheetChange}
    >
      {element}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
