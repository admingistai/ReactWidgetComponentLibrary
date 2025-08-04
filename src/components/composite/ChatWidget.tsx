import * as React from "react";
import { Send, Paperclip, Smile, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/widget/atoms/containers/GlassContainer";
import { Header } from "@/components/widget/organisms/Header";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/primitives/IconButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  WIDGET_STATES,
  WIDGET_POSITIONS,
  type WidgetState,
  type WidgetPosition,
  type WidgetSize,
} from "@/lib/constants";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read" | "error";
  avatar?: string;
  name?: string;
}

export interface ChatWidgetProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  title?: string;
  subtitle?: string;
  position?: WidgetPosition;
  size?: WidgetSize | { width: number | string; height: number | string };
  draggable?: boolean;
  resizable?: boolean;
  onClose?: () => void;
  isTyping?: boolean;
  typingIndicatorText?: string;
  placeholder?: string;
  className?: string;
  initialState?: WidgetState;
  showAttachment?: boolean;
  showEmoji?: boolean;
  userAvatar?: string;
  userName?: string;
  botAvatar?: string;
  botName?: string;
}

const ChatWidget = React.forwardRef<HTMLDivElement, ChatWidgetProps>(
  (
    {
      messages = [],
      onSendMessage,
      title = "Chat",
      subtitle = "Online",
      position = WIDGET_POSITIONS.BOTTOM_RIGHT,
      size = "SMALL",
      draggable = true,
      resizable = true,
      onClose,
      isTyping = false,
      placeholder = "Type a message...",
      className,
      initialState = WIDGET_STATES.FLOATING,
      showAttachment = true,
      showEmoji = true,
      userAvatar,
      userName = "You",
      botAvatar,
      botName = "Assistant",
    },
    ref
  ) => {
    const [widgetState, setWidgetState] = React.useState<WidgetState>(initialState);
    const [inputValue, setInputValue] = React.useState("");
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle send message
    const handleSend = () => {
      if (inputValue.trim() && onSendMessage) {
        onSendMessage(inputValue.trim());
        setInputValue("");
      }
    };

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    // Message bubble component
    const MessageBubble = ({ message }: { message: Message }) => {
      const isUser = message.sender === "user";
      const isSystem = message.sender === "system";

      if (isSystem) {
        return (
          <div className="flex justify-center my-2">
            <Badge variant="secondary" className="text-xs">
              {message.text}
            </Badge>
          </div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex gap-2 mb-4",
            isUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={isUser ? userAvatar : botAvatar} />
            <AvatarFallback>
              {isUser ? userName[0] : botName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">
                {isUser ? userName : botName}
              </span>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            
            <div
              className={cn(
                "px-3 py-2 rounded-lg max-w-[80%]",
                isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.text}
              </p>
            </div>
            
            {message.status && (
              <span className="text-xs text-muted-foreground mt-1">
                {message.status === "sending" && "Sending..."}
                {message.status === "sent" && "Sent"}
                {message.status === "delivered" && "Delivered"}
                {message.status === "read" && "Read"}
                {message.status === "error" && (
                  <span className="text-destructive">Failed</span>
                )}
              </span>
            )}
          </div>
        </motion.div>
      );
    };

    // Typing indicator component
    const TypingIndicator = () => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={botAvatar} />
          <AvatarFallback>{botName[0]}</AvatarFallback>
        </Avatar>
        <div className="bg-muted px-3 py-2 rounded-lg">
          <div className="flex gap-1">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-muted-foreground rounded-full"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-muted-foreground rounded-full"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-muted-foreground rounded-full"
            />
          </div>
        </div>
      </motion.div>
    );

    return (
      <GlassContainer
        ref={ref}
        className={cn(
          "flex flex-col fixed bottom-4 right-4 w-96 h-[600px] rounded-lg overflow-hidden",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full absolute -top-0.5 -right-0.5" />
              <Avatar className="h-8 w-8">
                <AvatarImage src={botAvatar} />
                <AvatarFallback>{botName[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <IconButton
              icon={<MoreHorizontal className="h-4 w-4" />}
              label="More options"
              size="sm"
              variant="ghost"
            />
            {onClose && (
              <IconButton
                icon={<span>×</span>}
                label="Close"
                size="sm"
                variant="ghost"
                onClick={onClose}
              />
            )}
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                No messages yet
              </p>
              <p className="text-xs text-muted-foreground">
                Start a conversation by typing a message below
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Footer with Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            {showAttachment && (
              <IconButton
                icon={<Paperclip className="h-4 w-4" />}
                label="Attach file"
                size="sm"
                variant="ghost"
              />
            )}
            {showEmoji && (
              <IconButton
                icon={<Smile className="h-4 w-4" />}
                label="Add emoji"
                size="sm"
                variant="ghost"
              />
            )}
          </div>
          
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1"
          />
          
          <IconButton
            icon={<Send className="h-4 w-4" />}
            label="Send message"
            size="sm"
            variant={inputValue.trim() ? "default" : "ghost"}
            disabled={!inputValue.trim()}
            onClick={handleSend}
          />
        </div>
      </GlassContainer>
    );
  }
);

ChatWidget.displayName = "ChatWidget";

export { ChatWidget };