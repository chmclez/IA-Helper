import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, Plus, Clock, Calculator as CalculatorIcon } from "lucide-react";

export const ToolsWidget = () => {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  // simple timer state
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  // pomodoro state
  const [pomoTime, setPomoTime] = useState(1500); // 25 min
  const [pomoRunning, setPomoRunning] = useState(false);

  useEffect(() => {
    if (!pomoRunning) return;
    const interval = setInterval(() => {
      setPomoTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [pomoRunning]);

  const format = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // calculator
  const [expression, setExpression] = useState("");

  const evaluate = () => {
    try {
      const result = eval(expression);
      setExpression(String(result));
    } catch {
      setExpression("Error");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => setTimerOpen(true)}>
        <Timer size={18} />
      </Button>
      {showPomodoro && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPomodoroOpen(true)}
        >
          <Clock size={18} />
        </Button>
      )}
      {showCalculator && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCalcOpen(true)}
        >
          <CalculatorIcon size={18} />
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            checked={showPomodoro}
            onCheckedChange={v => setShowPomodoro(!!v)}
          >
            Pomodoro
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showCalculator}
            onCheckedChange={v => setShowCalculator(!!v)}
          >
            Scientific Calculator
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Timer dialog */}
      <Dialog open={timerOpen} onOpenChange={setTimerOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Timer</DialogTitle>
          </DialogHeader>
          <div className="text-4xl font-bold text-center">{format(time)}</div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setTime(t => t + 60)}>+1 min</Button>
            <Button onClick={() => setTime(t => (t - 60 < 0 ? 0 : t - 60))}>-1 min</Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setRunning(r => !r)}>
              {running ? "Pause" : "Start"}
            </Button>
            <Button onClick={() => {setRunning(false); setTime(0);}}>Reset</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pomodoro dialog */}
      <Dialog open={pomodoroOpen} onOpenChange={setPomodoroOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Pomodoro</DialogTitle>
          </DialogHeader>
          <div className="text-4xl font-bold text-center">{format(pomoTime)}</div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setPomoTime(t => t + 60)}>+1 min</Button>
            <Button onClick={() => setPomoTime(t => (t - 60 < 0 ? 0 : t - 60))}>-1 min</Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setPomodoroOpen(false)}>Close</Button>
            <Button onClick={() => setPomoRunning(r => !r)}>
              {pomoRunning ? "Pause" : "Start"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calculator dialog */}
      <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Calculator</DialogTitle>
          </DialogHeader>
          <Input
            value={expression}
            onChange={e => setExpression(e.target.value)}
            placeholder="Enter expression"
          />
          <div className="flex justify-center gap-2">
            <Button onClick={evaluate}>Evaluate</Button>
            <Button onClick={() => setExpression("")}>Clear</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};