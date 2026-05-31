import {
  Component,
  computed,
  ElementRef,
  model,
  viewChild,
  effect,
  ModelSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  rangeValues: ModelSignal<number[]> = model.required<number[]>();
  minValue: ModelSignal<number> = model.required<number>(); // 0
  maxValue: ModelSignal<number> = model.required<number>(); // 2000
  sliderTrack = viewChild<ElementRef<HTMLDivElement>>('sliderTrack');
  // Internal state tracking for drag operations
  private activeHandle: 'min' | 'max' | null = null;
  private moveListener?: () => void;
  private stopListener?: () => void;
  // Percentages calculated from values (0% to 100%)
  minPercent = computed(() => this.valueToPercent(this.minValue()));
  maxPercent = computed(() => this.valueToPercent(this.maxValue()));
  sliderMin = computed(() => this.rangeValues()[0] ?? 0);
  sliderMax = computed(() => this.rangeValues()[1] ?? 100);
  private valueToPercent(val: number): number {
    const range = this.sliderMax() - this.sliderMin();
    return range === 0 ? 0 : ((val - this.sliderMin()) / range) * 100;
  }

  // Convert a pixel position on the track back into our data range value
  private calculateValueFromX(clientX: number): number {
    const track = this.sliderTrack()?.nativeElement;
    if (!track) return 0;

    const rect = track.getBoundingClientRect();
    const trackWidth = rect.width;

    // Clamp the pointer position relative to the track bounds
    let offsetX = clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, trackWidth));

    const percentage = offsetX / trackWidth;
    const rawValue =
      this.sliderMin() + percentage * (this.sliderMax() - this.sliderMin());

    return Math.round(rawValue);
  }

  // Triggered when a handle is clicked
  startDrag(event: MouseEvent, handle: 'min' | 'max') {
    event.preventDefault(); // Prevent text selection
    this.activeHandle = handle;

    // Attach global listeners so dragging continues even if mouse leaves the track
    this.moveListener = () => this.onMouseMove(window.event as MouseEvent);
    this.stopListener = () => this.stopDrag();

    window.addEventListener('mousemove', this.moveListener);
    window.addEventListener('mouseup', this.stopListener);
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.activeHandle) return;

    const newValue = this.calculateValueFromX(event.clientX);

    if (this.activeHandle === 'min') {
      // Don't let min pass max
      this.minValue.set(Math.min(newValue, this.maxValue()));
    } else {
      // Don't let max pass min
      this.maxValue.set(Math.max(newValue, this.minValue()));
    }
  }

  private stopDrag() {
    this.activeHandle = null;
    if (this.moveListener)
      window.removeEventListener('mousemove', this.moveListener);
    if (this.stopListener)
      window.removeEventListener('mouseup', this.stopListener);
  }

  // Optional: Allow snapping to a value just by clicking on the track line
  onTrackClick(event: MouseEvent) {
    const clickValue = this.calculateValueFromX(event.clientX);
    const distToMin = Math.abs(clickValue - this.minValue());
    const distToMax = Math.abs(clickValue - this.maxValue());

    // Update whichever handle is closer to the click point
    if (distToMin < distToMax) {
      this.minValue.set(Math.min(clickValue, this.maxValue()));
    } else {
      this.maxValue.set(Math.max(clickValue, this.minValue()));
    }
  }
  ngOnDestroy() {
    this.stopDrag(); // Cleanup event listeners on destroy
  }
  preventNonNumericValues(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];
    if (!/[0-9]/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  onMinInputChange(incomingValue: string, inputElement: HTMLInputElement) {
    const cleanString = incomingValue.replace(/[^0-9]/g, '');

    if (cleanString === '') {
      // Allow the field to stay empty temporarily while typing
      this.minValue.set(this.sliderMin());
      return;
    }

    let numericValue = Number(cleanString);

    // Keep it within the absolute slider minimum boundary
    if (numericValue < this.sliderMin()) {
      numericValue = this.sliderMin();
      inputElement.value = numericValue.toString();
    }

    this.minValue.set(numericValue);
  }
  onMaxInputChange(incomingValue: string, inputElement: HTMLInputElement) {
    const cleanString = incomingValue.replace(/[^0-9]/g, '');

    if (cleanString === '') {
      // Allow the field to stay empty temporarily while typing
      this.maxValue.set(this.sliderMax());
      return;
    }

    let numericValue = Number(cleanString);

    // Keep it within the absolute slider maximum boundary
    if (numericValue > this.sliderMax()) {
      numericValue = this.sliderMax();
      inputElement.value = numericValue.toString();
    }

    this.maxValue.set(numericValue);
  }
}
